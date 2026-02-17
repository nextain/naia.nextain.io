import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/gateway-client";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.gwUserId) redirect("/login");

  const user = await getUser(session.gwUserId);

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard"
          className="text-foreground/40 hover:text-foreground transition"
        >
          &larr;
        </Link>
        <h1 className="text-2xl font-bold">설정</h1>
      </header>

      {/* Profile */}
      <section className="rounded-xl border border-foreground/10 p-6 mb-6">
        <h2 className="text-sm font-medium text-foreground/60 mb-3">프로필</h2>
        <dl className="grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-foreground/40">이름</dt>
          <dd>{session.user?.name ?? "-"}</dd>
          <dt className="text-foreground/40">이메일</dt>
          <dd>{session.user?.email}</dd>
          <dt className="text-foreground/40">OAuth 프로바이더</dt>
          <dd className="capitalize">{session.gwUserId.split(":")[0]}</dd>
        </dl>
      </section>

      {/* Gateway Info */}
      <section className="rounded-xl border border-foreground/10 p-6 mb-6">
        <h2 className="text-sm font-medium text-foreground/60 mb-3">
          Gateway 정보
        </h2>
        <dl className="grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-foreground/40">User ID</dt>
          <dd className="font-mono text-xs">{user?.user_id ?? "-"}</dd>
          <dt className="text-foreground/40">Budget ID</dt>
          <dd className="font-mono text-xs">{user?.budget_id ?? "없음"}</dd>
          <dt className="text-foreground/40">가입일</dt>
          <dd>
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString("ko-KR")
              : "-"}
          </dd>
        </dl>
      </section>

      {/* Desktop App Connection */}
      <section className="rounded-xl border border-foreground/10 p-6">
        <h2 className="text-sm font-medium text-foreground/60 mb-3">
          데스크톱 앱 연결
        </h2>
        <p className="text-sm text-foreground/60 mb-4">
          Cafelua OS 데스크톱 앱에서 이 계정으로 로그인할 수 있습니다.
        </p>
        <Link
          href={`/callback?source=web`}
          className="inline-block rounded-lg border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition"
        >
          데스크톱 앱 연결 키 발급
        </Link>
      </section>
    </main>
  );
}
