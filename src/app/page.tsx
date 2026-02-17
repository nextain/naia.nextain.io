import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Cafelua Lab</h1>
        <p className="mt-3 text-lg text-foreground/60">
          AI 서비스 포털
        </p>
      </div>

      {session ? (
        <Link
          href="/dashboard"
          className="rounded-lg bg-foreground px-6 py-3 text-background font-medium hover:opacity-90 transition"
        >
          대시보드로 이동
        </Link>
      ) : (
        <Link
          href="/login"
          className="rounded-lg bg-foreground px-6 py-3 text-background font-medium hover:opacity-90 transition"
        >
          로그인
        </Link>
      )}
    </main>
  );
}
