import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { socialLogin, createVirtualKey, listKeys, deleteKey } from "./gateway-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Discord],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, user }) {
      console.log("[auth] signIn callback", {
        provider: account?.provider,
        hasEmail: !!user?.email,
        hasName: !!user?.name,
        providerAccountId: account?.providerAccountId?.slice(0, 6),
      });
      return !!account;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;

        // Discord users may not have a verified email — email can be null
        const email = user?.email ?? undefined;

        console.log("[auth] jwt callback — socialLogin start", {
          provider: account.provider,
          email: email ? "yes" : "no",
        });

        try {
          // Gateway social login — creates user + FREE plan credits on first login
          const response = await socialLogin(
            account.provider,
            email,
            user?.name ?? undefined,
            user?.image ?? undefined,
            account.providerAccountId,
          );
          // Extract gateway UUID from JWT access_token
          const payload = JSON.parse(
            Buffer.from(response.tokens.access_token.split(".")[1], "base64url").toString(),
          );
          token.gwUserId = payload.sub;
          console.log("[auth] jwt callback — socialLogin OK, gwUserId:", payload.sub?.slice(0, 8));
        } catch (err) {
          // Gateway might be down — fallback to provider:accountId
          console.error("[auth] socialLogin failed:", err instanceof Error ? err.message : String(err));
          console.error("[auth] socialLogin error stack:", err instanceof Error ? err.stack : "no stack");
          token.gwUserId = `${account.provider}:${account.providerAccountId}`;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.gwUserId = token.gwUserId as string;
      session.provider = token.provider as string;
      session.providerAccountId = token.providerAccountId as string | undefined;
      return session;
    },
  },
});

/**
 * Issue a gateway virtual key for the desktop app.
 * Called from the /callback flow.
 */
export async function issueDesktopKey(gwUserId: string): Promise<string> {
  const keyName = `desktop-${gwUserId}`;
  // Delete ALL existing desktop keys for this user (not just one by exact name)
  try {
    const existingKeys = await listKeys(gwUserId);
    const desktopKeys = existingKeys.filter(
      k => k.key_name === keyName || k.key_name?.startsWith("desktop-"),
    );
    for (const oldKey of desktopKeys) {
      try {
        await deleteKey(oldKey.id);
      } catch (delErr) {
        console.error("[auth] Failed to delete old desktop key:", oldKey.id, delErr);
      }
    }
  } catch (err) {
    console.error("[auth] Failed to list existing keys:", err);
  }

  const keyResponse = await createVirtualKey(gwUserId, keyName);
  return keyResponse.key;
}
