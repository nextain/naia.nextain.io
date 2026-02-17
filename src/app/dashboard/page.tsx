import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUser, getUserUsage } from "@/lib/gateway-client";
import { signOut } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.gwUserId) redirect("/login");

  const [user, usage] = await Promise.all([
    getUser(session.gwUserId),
    getUserUsage(session.gwUserId, 0, 20),
  ]);

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">대시보드</h1>
        <div className="flex gap-3 items-center">
          <Link
            href="/settings"
            className="text-sm text-foreground/60 hover:text-foreground transition"
          >
            설정
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="text-sm text-foreground/60 hover:text-foreground transition"
            >
              로그아웃
            </button>
          </form>
        </div>
      </header>

      {/* Credit Info */}
      <section className="rounded-xl border border-foreground/10 p-6 mb-6">
        <h2 className="text-sm font-medium text-foreground/60 mb-1">
          크레딧 사용량
        </h2>
        <p className="text-3xl font-bold">
          ${user?.spend?.toFixed(4) ?? "0.0000"}
        </p>
        {user?.budget_id && user.next_budget_reset_at && (
          <p className="mt-1 text-sm text-foreground/40">
            다음 리셋:{" "}
            {new Date(user.next_budget_reset_at).toLocaleDateString("ko-KR")}
          </p>
        )}
      </section>

      {/* Account Info */}
      <section className="rounded-xl border border-foreground/10 p-6 mb-6">
        <h2 className="text-sm font-medium text-foreground/60 mb-3">
          계정 정보
        </h2>
        <dl className="grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-foreground/40">이메일</dt>
          <dd>{session.user?.email}</dd>
          <dt className="text-foreground/40">Gateway ID</dt>
          <dd className="font-mono text-xs">{session.gwUserId}</dd>
          <dt className="text-foreground/40">상태</dt>
          <dd>{user?.blocked ? "차단됨" : "활성"}</dd>
        </dl>
      </section>

      {/* Usage History */}
      <section className="rounded-xl border border-foreground/10 p-6">
        <h2 className="text-sm font-medium text-foreground/60 mb-3">
          사용 내역
        </h2>
        {usage.length === 0 ? (
          <p className="text-sm text-foreground/40">아직 사용 내역이 없습니다</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-foreground/40 border-b border-foreground/10">
                  <th className="pb-2">시간</th>
                  <th className="pb-2">모델</th>
                  <th className="pb-2">토큰</th>
                  <th className="pb-2 text-right">비용</th>
                </tr>
              </thead>
              <tbody>
                {usage.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-foreground/5"
                  >
                    <td className="py-2">
                      {new Date(log.timestamp).toLocaleString("ko-KR", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-2 font-mono text-xs">{log.model}</td>
                    <td className="py-2">{log.total_tokens ?? "-"}</td>
                    <td className="py-2 text-right">
                      ${log.cost?.toFixed(6) ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
