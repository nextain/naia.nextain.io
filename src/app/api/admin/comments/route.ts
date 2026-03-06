import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

const FIRESTORE_ID_RE = /^[a-zA-Z0-9]{10,30}$/;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, max = 60, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!checkRateLimit("admin-comments")) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { action, id, limit: rawLimit, after, postSlug } = body as {
      action: "list" | "delete";
      id?: string;
      limit?: number;
      after?: string;
      postSlug?: string;
    };

    if (!action || !["list", "delete"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const db = getAdminDb();

    if (action === "delete") {
      if (!id || !FIRESTORE_ID_RE.test(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }
      await db.collection("comments").doc(id).update({ deleted: true });
      return NextResponse.json({ ok: true });
    }

    // action === "list"
    const limitCount = Math.min(rawLimit || 50, 200);
    let q: FirebaseFirestore.Query = db
      .collection("comments")
      .orderBy("createdAt", "desc");

    if (postSlug && typeof postSlug === "string") {
      q = q.where("postSlug", "==", postSlug);
    }

    if (after) {
      const afterDate = new Date(after);
      if (!isNaN(afterDate.getTime())) {
        q = q.startAfter(Timestamp.fromDate(afterDate));
      }
    }

    const snapshot = await q.limit(limitCount).get();

    const items = snapshot.docs.map((d) => {
      const data = d.data();
      const ts = data.createdAt as Timestamp | null;
      return {
        id: d.id,
        postSlug: data.postSlug ?? "",
        locale: data.locale ?? "",
        parentId: data.parentId ?? null,
        userName: data.userName ?? "",
        userId: data.userId ?? null,
        userImage: data.userImage ?? null,
        isGuest: data.isGuest ?? true,
        guestName: data.guestName ?? null,
        content: data.content ?? "",
        createdAt: ts?.toDate().toISOString() ?? null,
        deleted: data.deleted ?? false,
      };
    });

    const last = items.length > 0 ? items[items.length - 1] : null;
    return NextResponse.json({ items, lastCursor: last?.createdAt ?? null });
  } catch (err) {
    console.error("[admin/comments]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
