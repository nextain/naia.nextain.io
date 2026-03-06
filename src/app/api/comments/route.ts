import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAdminDb } from "@/lib/firebase-admin";
import { sendEmail, buildReplyNotificationEmail } from "@/lib/email";
import { FieldValue } from "firebase-admin/firestore";
import crypto from "crypto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_SECONDS = 60;
const MAX_CONTENT_LENGTH = 2000;
const MAX_LINKS = 3;
const ADMIN_IDS = (process.env.COMMENT_ADMIN_IDS ?? "").split(",").filter(Boolean);

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function countLinks(text: string): number {
  return (text.match(/https?:\/\//g) ?? []).length;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postSlug, locale, content, parentId, guestName, email } = body;

    if (!postSlug || !locale || !content?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const trimmed = content.trim();
    if (trimmed.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json({ error: "Content too long" }, { status: 400 });
    }
    if (countLinks(trimmed) > MAX_LINKS) {
      return NextResponse.json({ error: "Too many links" }, { status: 400 });
    }

    const session = await auth();
    const isGuest = !session?.gwUserId;

    // Logged-in users: use session email; guests: use submitted email
    const rawEmail = isGuest
      ? (typeof email === "string" ? email.trim() : "")
      : (session?.user?.email ?? "");
    if (rawEmail && !EMAIL_RE.test(rawEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const trimEmail = rawEmail;

    if (isGuest && (typeof guestName !== "string" || !guestName.trim())) {
      return NextResponse.json({ error: "Guest name required" }, { status: 400 });
    }

    const db = getAdminDb();
    const ip = getClientIp(req);
    const ipHash = hashIp(ip);

    // Rate limiting
    const recentComments = await db
      .collection("comments")
      .where("ipHash", "==", ipHash)
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (!recentComments.empty) {
      const lastComment = recentComments.docs[0].data();
      const lastTime = lastComment.createdAt?.toMillis?.() ?? 0;
      if (Date.now() - lastTime < RATE_LIMIT_SECONDS * 1000) {
        return NextResponse.json(
          { error: "Please wait before posting again" },
          { status: 429 },
        );
      }
    }

    const userName = isGuest ? guestName.trim() : (session?.user?.name ?? "Anonymous");

    const commentData: Record<string, unknown> = {
      postSlug,
      locale,
      content: trimmed,
      createdAt: FieldValue.serverTimestamp(),
      parentId: parentId ?? null,
      isGuest,
      guestName: isGuest ? guestName.trim() : null,
      userId: session?.gwUserId ?? null,
      userName,
      userImage: isGuest ? null : (session?.user?.image ?? null),
      userProvider: isGuest ? null : (session?.provider ?? null),
      ipHash,
      deleted: false,
    };
    if (trimEmail) {
      commentData.email = trimEmail;
    }

    const docRef = await db.collection("comments").add(commentData);

    // Send reply notification email (fire and forget)
    if (parentId) {
      const parentDoc = await db.collection("comments").doc(parentId).get();
      const parentData = parentDoc.data();
      if (parentData?.email) {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://naia.nextain.io";
        const postUrl = `${baseUrl}/${locale}/blog/${postSlug}`;
        const emailData = buildReplyNotificationEmail({
          parentName: parentData.userName ?? "Anonymous",
          replyName: userName,
          replyContent: trimmed,
          postSlug,
          postUrl,
        });
        sendEmail({ to: parentData.email, ...emailData }).catch(() => {});
      }
    }

    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("[comments] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing comment id" }, { status: 400 });
    }

    const session = await auth();
    if (!session?.gwUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getAdminDb();
    const docRef = db.collection("comments").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const data = doc.data()!;
    const isOwner = data.userId === session.gwUserId;
    const isAdmin = ADMIN_IDS.includes(session.gwUserId);

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await docRef.update({ deleted: true });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[comments] DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
