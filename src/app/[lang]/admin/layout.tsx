import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { AdminNav } from "./admin-nav";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";
  if (!host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    notFound();
  }

  const { lang } = await params;

  return (
    <div className="flex h-screen flex-col">
      <AdminNav lang={lang} />
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
