/**
 * Discord bot service for naia.
 *
 * Connects to Discord WebSocket Gateway via discord.js.
 * On message (mention or DM), looks up the CaretUser via provider_account_id,
 * calls the any-llm gateway for LLM completion, and replies with the response.
 */

import { Client, Events, GatewayIntentBits, type Message } from "discord.js";
import { lookupUser } from "./gateway-client";
import {
  DISCORD_BOT_TOKEN,
  GATEWAY_URL,
  GATEWAY_MASTER_KEY,
  MAX_MESSAGE_LENGTH,
  RATE_LIMIT_PER_MINUTE,
} from "./discord-bot-config";

const rateLimits = new Map<string, number[]>();

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const timestamps = rateLimits.get(userId) ?? [];
  const recent = timestamps.filter((t) => now - t < 60_000);
  if (recent.length >= RATE_LIMIT_PER_MINUTE) return true;
  recent.push(now);
  rateLimits.set(userId, recent);
  return false;
}

function splitMessage(text: string): string[] {
  if (text.length <= MAX_MESSAGE_LENGTH) return [text];
  const chunks: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= MAX_MESSAGE_LENGTH) {
      chunks.push(remaining);
      break;
    }
    let splitAt = remaining.lastIndexOf("\n", MAX_MESSAGE_LENGTH);
    if (splitAt === -1 || splitAt < MAX_MESSAGE_LENGTH / 2) {
      splitAt = MAX_MESSAGE_LENGTH;
    }
    chunks.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt);
  }
  return chunks;
}

async function callLLM(
  userId: string,
  content: string,
): Promise<string> {
  const url = `${GATEWAY_URL}/v1/chat/completions`;
  const res = await fetch(url, {
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

async function handleMessage(message: Message): Promise<void> {
  if (message.author.bot) return;

  const isMention =
    message.mentions.users.has(message.client.user!.id) ||
    message.mentions.roles.some((role) =>
      message.guild?.members.me?.roles.cache.has(role.id),
    );
  const isDM = !message.guild;

  if (!isMention && !isDM) return;

  const discordUserId = message.author.id;

  if (isRateLimited(discordUserId)) {
    await message.reply(
      "Too many messages. Please wait a moment before trying again.",
    );
    return;
  }

  try {
    const caretUser = await lookupUser("discord", {
      providerAccountId: discordUserId,
    });

    if (!caretUser) {
      await message.reply(
        "This Discord account is not linked to naia.\n" +
          "Please log in with Discord at https://naia.nextain.io to connect your account.",
      );
      return;
    }

    if ("sendTyping" in message.channel) {
      await message.channel.sendTyping();
    }

    const content = message.content
      .replace(/<@!?\d+>/g, "")
      .trim();

    if (!content) {
      await message.reply("Please send a message to chat with me!");
      return;
    }

    const response = await callLLM(caretUser.user_id, content);

    const chunks = splitMessage(response);
    for (const chunk of chunks) {
      await message.reply(chunk);
    }
  } catch (err) {
    console.error("[discord-bot] Error handling message:", err);
    await message.reply(
      "Sorry, an error occurred while processing your message.",
    );
  }
}

export function createBot(): Client {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once(Events.ClientReady, (c) => {
    console.log(`[discord-bot] Ready as ${c.user.tag}`);
  });

  client.on(Events.MessageCreate, handleMessage);

  return client;
}

export async function startBot(): Promise<void> {
  if (!DISCORD_BOT_TOKEN) {
    throw new Error("DISCORD_BOT_TOKEN is not set");
  }

  const client = createBot();
  await client.login(DISCORD_BOT_TOKEN);

  const shutdown = () => {
    console.log("[discord-bot] Shutting down...");
    client.destroy();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
