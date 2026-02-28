/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ManualMarkdownProps {
  markdown: string;
  lang: string;
}

export function ManualMarkdown({ markdown, lang }: ManualMarkdownProps) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox]);

  return (
    <>
      <article className="mt-8 space-y-4 text-sm leading-7 text-muted-foreground">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="mb-2 mt-8 clear-both text-xl font-semibold text-foreground">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-1 mt-5 clear-both text-base font-semibold text-foreground">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="mb-1 mt-4 clear-both text-sm font-semibold text-foreground">
                {children}
              </h4>
            ),
            ul: ({ children }) => (
              <ul className="list-disc space-y-1 pl-5">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal space-y-1 pl-5">{children}</ol>
            ),
            table: ({ children }) => (
              <div className="my-4 clear-both overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-border/50 bg-muted/30 px-3 py-2 text-left font-medium text-foreground">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-border/50 px-3 py-2">{children}</td>
            ),
            img: ({ src, alt }) => {
              const srcStr = typeof src === "string" ? src : "";
              const resolvedSrc = srcStr.startsWith("/")
                ? srcStr
                : `/manual/${lang}/${srcStr}`;

              // Render .mp4/.webm as video instead of img
              if (/\.(mp4|webm)$/i.test(srcStr)) {
                return (
                  <video
                    src={resolvedSrc}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-auto w-full rounded-lg border border-border/30 shadow-sm"
                  >
                    {alt}
                  </video>
                );
              }

              return (
                <img
                  src={resolvedSrc}
                  alt={alt ?? ""}
                  data-manual-img=""
                  data-alt={alt ?? ""}
                  className="h-auto w-full cursor-pointer rounded-lg border border-border/30 shadow-sm transition-opacity hover:opacity-80"
                  loading="lazy"
                  onClick={() => setLightbox({ src: resolvedSrc, alt: alt ?? "" })}
                />
              );
            },
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="rounded bg-muted/50 px-1.5 py-0.5 text-xs font-mono text-foreground">
                    {children}
                  </code>
                );
              }
              return (
                <code className={className}>{children}</code>
              );
            },
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground/80">
                {children}
              </blockquote>
            ),
            p: ({ node, children }) => {
              const hasImg = node?.children?.some(
                (c) => c.type === "element" && c.tagName === "img",
              );
              if (hasImg) {
                const imgHast = node?.children?.find(
                  (c) => c.type === "element" && c.tagName === "img",
                );
                const alt = imgHast && "properties" in imgHast
                  ? String((imgHast.properties as Record<string, unknown>)?.alt ?? "")
                  : "";
                return (
                  <figure
                    className="my-4 md:float-right md:my-2 md:ml-4"
                    style={{ width: "min(220px, 50%)" }}
                  >
                    {children}
                    {alt && (
                      <figcaption className="mt-1 text-center text-xs text-muted-foreground/70">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return <p>{children}</p>;
            },
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">{children}</strong>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            {lightbox.alt && (
              <p className="mt-2 text-center text-sm text-white/80">
                {lightbox.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
