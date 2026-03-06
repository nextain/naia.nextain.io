import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";

export const MANUAL_SLUGS = [
  "video-manual",
  "live-usb",
  "install",
  "install-iso",
  "install-app",
  "getting-started",
  "main-screen",
  "chat",
  "history",
  "progress",
  "skills",
  "channels",
  "agents",
  "diagnostics",
  "settings",
  "tools",
  "naia-account",
  "troubleshooting",
  "open-source",
] as const;

export type ManualSlug = (typeof MANUAL_SLUGS)[number];

export function isManualSlug(value: string): value is ManualSlug {
  return (MANUAL_SLUGS as readonly string[]).includes(value);
}

export async function readManual(
  lang: Locale,
  slug?: ManualSlug,
): Promise<string> {
  const filename = slug ?? "index";
  let fullPath = path.join(
    process.cwd(),
    "src",
    "content",
    "manual",
    lang,
    `${filename}.md`,
  );

  if (!existsSync(fullPath)) {
    fullPath = path.join(
      process.cwd(),
      "src",
      "content",
      "manual",
      "en",
      `${filename}.md`,
    );
  }

  return readFile(fullPath, "utf-8");
}

/** Slug → hierarchical display number (e.g. "2.1") */
export const SLUG_NUMBER: Record<ManualSlug, string> = {
  "video-manual": "1",
  "live-usb": "2",
  install: "3",
  "install-iso": "3.1",
  "install-app": "3.2",
  "getting-started": "4",
  "main-screen": "5",
  chat: "6",
  history: "7",
  progress: "8",
  skills: "9",
  channels: "10",
  agents: "11",
  diagnostics: "12",
  settings: "13",
  tools: "14",
  "naia-account": "15",
  troubleshooting: "16",
  "open-source": "17",
};

/** Slug → i18n section key mapping */
export const SLUG_TO_SECTION_KEY: Record<ManualSlug, string> = {
  "video-manual": "videoManual",
  "live-usb": "liveUsb",
  install: "install",
  "install-iso": "installIso",
  "install-app": "installApp",
  "getting-started": "gettingStarted",
  "main-screen": "mainScreen",
  chat: "chat",
  history: "history",
  progress: "progress",
  skills: "skills",
  channels: "channels",
  agents: "agents",
  diagnostics: "diagnostics",
  settings: "settings",
  tools: "tools",
  "naia-account": "naiaAccount",
  troubleshooting: "troubleshooting",
  "open-source": "openSource",
};
