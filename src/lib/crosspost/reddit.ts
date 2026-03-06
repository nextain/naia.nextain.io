interface RedditPostOptions {
  title: string;
  summary: string;
  slug: string;
  subreddit: string;
}

export function generateRedditSubmitUrl(opts: RedditPostOptions): string {
  const blogUrl = `https://naia.nextain.io/en/blog/${opts.slug}`;

  const text = [
    opts.summary,
    "",
    `Read the full post: ${blogUrl}`,
  ].join("\n");

  const params = new URLSearchParams({
    type: "self",
    title: opts.title,
    text,
  });

  return `https://www.reddit.com/r/${opts.subreddit}/submit?${params.toString()}`;
}

export function generateRedditPostContent(opts: {
  title: string;
  summary: string;
  slug: string;
}): { title: string; body: string; url: string } {
  const blogUrl = `https://naia.nextain.io/en/blog/${opts.slug}`;

  return {
    title: opts.title,
    body: [
      opts.summary,
      "",
      `Read the full post: ${blogUrl}`,
    ].join("\n"),
    url: blogUrl,
  };
}
