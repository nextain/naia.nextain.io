const DEVTO_API_URL = "https://dev.to/api/articles";

interface DevtoArticle {
  title: string;
  body_markdown: string;
  published: boolean;
  tags: string[];
  canonical_url: string;
  description?: string;
  main_image?: string;
}

interface DevtoResponse {
  id: number;
  url: string;
  title: string;
}

function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 30);
}

export async function publishToDevTo(opts: {
  title: string;
  markdown: string;
  tags: string[];
  slug: string;
  summary?: string;
  heroUrl?: string;
}): Promise<DevtoResponse> {
  const apiKey = process.env.DEVTO_API_KEY;
  if (!apiKey) {
    throw new Error("DEVTO_API_KEY is not configured");
  }

  const devtoTags = opts.tags
    .map(normalizeTag)
    .filter((t) => t.length > 0)
    .slice(0, 4);

  const article: DevtoArticle = {
    title: opts.title,
    body_markdown: opts.markdown,
    published: true,
    tags: devtoTags,
    canonical_url: `https://naia.nextain.io/en/blog/${opts.slug}`,
    description: opts.summary,
    main_image: opts.heroUrl,
  };

  const res = await fetch(DEVTO_API_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "User-Agent": "naia-nextain-io/1.0",
    },
    body: JSON.stringify({ article }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Dev.to API error (${res.status}): ${text}`);
  }

  return res.json();
}
