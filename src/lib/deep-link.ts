type BuildNaiaAuthDeepLinkInput = {
  key: string;
  userId?: string | null;
  state?: string | null;
};

export function buildNaiaAuthDeepLink(input: BuildNaiaAuthDeepLinkInput): string {
  const params = new URLSearchParams();
  params.set("key", input.key);

  if (input.userId?.trim()) {
    params.set("user_id", input.userId.trim());
  }

  if (input.state?.trim()) {
    params.set("state", input.state.trim());
  }

  return `naia://auth?${params.toString()}`;
}
