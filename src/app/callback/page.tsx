"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function CallbackContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const [key, setKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function issueKey() {
      try {
        const res = await fetch("/api/gateway/desktop-key", { method: "POST" });
        if (!res.ok) throw new Error("키 발급 실패");
        const data = await res.json();
        setKey(data.key);

        // Desktop deep link auto-redirect
        if (source !== "web") {
          window.location.href = `cafelua://auth?key=${encodeURIComponent(data.key)}`;
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "알 수 없는 오류");
      }
    }
    issueKey();
  }, [source]);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <a href="/dashboard" className="text-sm underline">
          대시보드로 돌아가기
        </a>
      </div>
    );
  }

  if (!key) {
    return <p className="text-foreground/60">키 발급 중...</p>;
  }

  // Web source: show key for manual copy
  if (source === "web") {
    return (
      <div className="text-center max-w-md">
        <h2 className="text-xl font-bold mb-2">데스크톱 앱 연결 키</h2>
        <p className="text-sm text-foreground/60 mb-4">
          아래 키를 Cafelua OS 설정에 붙여넣으세요.
        </p>
        <div className="flex items-center gap-2 rounded-lg border border-foreground/10 p-3">
          <code className="flex-1 text-xs break-all">{key}</code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(key);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="shrink-0 rounded border border-foreground/20 px-3 py-1 text-xs hover:bg-foreground/5 transition"
          >
            {copied ? "복사됨" : "복사"}
          </button>
        </div>
        <a
          href="/settings"
          className="inline-block mt-6 text-sm text-foreground/60 hover:text-foreground"
        >
          &larr; 설정으로 돌아가기
        </a>
      </div>
    );
  }

  // Desktop source: auto-redirect happened
  return (
    <div className="text-center">
      <p className="text-foreground/60 mb-4">
        데스크톱 앱으로 리다이렉트 중...
      </p>
      <p className="text-sm text-foreground/40">
        자동으로 이동하지 않으면{" "}
        <a
          href={`cafelua://auth?key=${encodeURIComponent(key)}`}
          className="underline"
        >
          여기를 클릭
        </a>
        하세요.
      </p>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Suspense fallback={<p className="text-foreground/60">로딩 중...</p>}>
        <CallbackContent />
      </Suspense>
    </main>
  );
}
