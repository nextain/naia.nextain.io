import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { socialLogin, createVirtualKey } from "./gateway-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Discord],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account }) {
      return !!account;
    },
    async jwt({ token, account, user }) {
      if (account && user?.email) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;

        try {
          // Gateway social login — creates user + FREE plan credits on first login
          const response = await socialLogin(
            account.provider,
            user.email,
            user.name ?? undefined,
            user.image ?? undefined,
          );
          // Extract gateway UUID from JWT access_token
          const payload = JSON.parse(
            Buffer.from(response.tokens.access_token.split(".")[1], "base64url").toString(),
          );
          token.gwUserId = payload.sub;
        } catch {
          // Gateway might be down — fallback to provider:accountId
          token.gwUserId = `${account.provider}:${account.providerAccountId}`;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.gwUserId = token.gwUserId as string;
      return session;
    },
  },
});

/**
 * Issue a gateway virtual key for the desktop app.
 * Called from the /callback flow.
 */
export async function issueDesktopKey(gwUserId: string): Promise<string> {
  const keyResponse = await createVirtualKey(gwUserId, `desktop-${gwUserId}`);
  return keyResponse.key;
}
