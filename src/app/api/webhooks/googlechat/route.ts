/**
 * Google Chat webhook handler.
 *
 * POST /api/webhooks/googlechat
 *
 * Receives messages from Google Chat, looks up the sender by email,
 * calls the any-llm gateway, and returns the response in Google Chat format.
 */

import { NextResponse } from "next/server";
import { lookupUser } from "@/lib/gateway-client";

const GATEWAY_URL = process.env.GATEWAY_URL ?? "http://localhost:8000";
const GATEWAY_MASTER_KEY = process.env.GATEWAY_MASTER_KEY ?? "";

interface GoogleChatEvent {
  type: string;
  message?: {
    sender?: {
      email?: string;
      displayName?: string;
    };
    text?: string;
    argumentText?: string;
  };
  user?: {
    email?: string;
    displayName?: string;
  };
  space?: {
    type?: string;
  };
}

async function callLLM(userId: string, content: string): Promise<string> {
  const res = await fetch(`${GATEWAY_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AnyLLM-Key": `Bearer ${GATEWAY_MASTER_KEY}`,
    },
    body: JSON.stringify({
      model: "gemini-2.0-flash",
      user: userId,
      messages: [
        {
          role: "system",
          content:
            "You are Naia, a friendly AI assistant from naia. Respond in the same language as the user. Keep responses concise for chat.",
        },
        { role: "user", content },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gateway ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    choices: Array<{ message: { content: string } }>;
  };
  return data.choices[0]?.message?.content ?? "(no response)";
}

export async function POST(request: Request) {
  try {
    const event = (await request.json()) as GoogleChatEvent;

    if (event.type === "ADDED_TO_SPACE") {
      return NextResponse.json({
        text: "Hi! I'm Naia from naia. Send me a message to get started!",
      });
    }

    if (event.type !== "MESSAGE") {
      return NextResponse.json({ text: "" });
    }

    const senderEmail =
      event.message?.sender?.email ?? event.user?.email;
    const messageText =
      event.message?.argumentText ?? event.message?.text ?? "";

    if (!senderEmail) {
      return NextResponse.json({
        text: "Could not identify sender. Please try again.",
      });
    }

    if (!messageText.trim()) {
      return NextResponse.json({
        text: "Please send a message to chat with me!",
      });
    }

    const caretUser = await lookupUser("google", { email: senderEmail });

    if (!caretUser) {
      return NextResponse.json({
        text:
          "This Google account is not linked to naia.\n" +
          "Please log in with Google at https://naia.nextain.io to connect your account.",
      });
    }

    const response = await callLLM(caretUser.user_id, messageText.trim());

    return NextResponse.json({ text: response });
  } catch (err) {
    console.error("[googlechat-webhook] Error:", err);
    return NextResponse.json({
      text: "Sorry, an error occurred while processing your message.",
    });
  }
}
