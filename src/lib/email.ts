/**
 * Email utility using Office 365 SMTP (nodemailer).
 * If SMTP_USER is not set, emails are silently skipped.
 */

import nodemailer from "nodemailer";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.COMMENT_NOTIFY_FROM || user;

  if (!user || !pass) {
    console.warn("[email] SMTP_USER/SMTP_PASS not set — skipping email");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });

    return true;
  } catch (err) {
    console.error("[email] send failed:", err);
    return false;
  }
}

export function buildReplyNotificationEmail(opts: {
  parentName: string;
  replyName: string;
  replyContent: string;
  postSlug: string;
  postUrl: string;
}): { subject: string; html: string } {
  const parentName = escapeHtml(opts.parentName);
  const replyName = escapeHtml(opts.replyName);
  const slug = escapeHtml(opts.postSlug);
  const escapedContent = escapeHtml(opts.replyContent).replace(/\n/g, "<br>");
  const subject = `[Naia] ${opts.replyName} replied to your comment`;
  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
    <h2 style="color: #2563eb; margin-bottom: 16px;">Naia Blog — New Reply</h2>
    <p>Hi ${parentName},</p>
    <p><strong>${replyName}</strong> replied to your comment on &ldquo;<a href="${escapeHtml(opts.postUrl)}">${slug}</a>&rdquo;:</p>
    <blockquote style="border-left: 3px solid #2563eb; padding: 8px 12px; margin: 16px 0; background: #eff6ff; color: #333;">
        ${escapedContent}
    </blockquote>
    <a href="${escapeHtml(opts.postUrl)}" style="display: inline-block; padding: 8px 16px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 4px;">View Post</a>
    <p style="margin-top: 24px; font-size: 12px; color: #999;">You received this email because you provided your email when commenting.</p>
</div>`.trim();
  return { subject, html };
}
