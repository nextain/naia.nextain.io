/**
 * Statistics report types.
 * Used across all collectors and the email template.
 */

export type ReportType = "daily" | "weekly";

export interface LocaleBreakdown {
  ko: number;
  en: number;
  total: number;
}

export interface DeltaValue {
  current: number;
  previous: number;
  delta: number;
  /** Percentage change (0-100). null when previous is 0. */
  deltaPercent: number | null;
}

export interface LocaleDelta {
  ko: DeltaValue;
  en: DeltaValue;
  total: DeltaValue;
}

export interface ModelUsage {
  model: string;
  requests: number;
  tokens: number;
  cost: number;
}

export interface ReferralSource {
  source: string;
  sessions: number;
}

export interface PopularPost {
  slug: string;
  title: string;
  views: number;
}

export interface DownloadStat {
  label: string;
  clicks: number;
}

// --- Collector outputs ---

export interface GA4Stats {
  visitors: LocaleBreakdown;
  newUsers: LocaleBreakdown;
  pageViews: LocaleBreakdown;
  cumulativeVisitors: LocaleBreakdown;
  cumulativeDownloads: number;
  referrals: ReferralSource[];
  blogTopPosts: PopularPost[];
  downloads: DownloadStat[];
  returningUserRate: number | null; // 0-100
  /** Daily trend for sparkline chart (7 days for daily, 28 days for weekly) */
  dailyTrend: Array<{ date: string; visitors: number; newUsers: number }>;
}

export interface GatewayStats {
  totalUsers: number;
  newUsers: number;
  paidUsers: number;
  totalRequests: number;
  totalTokens: number;
  totalSpend: number; // dollars
  errorCount: number;
  errorRate: number | null; // 0-100
  topModels: ModelUsage[];
  totalKeys: number;
  activeKeys: number;
  desktopKeys: number;
  discordUsers: number;
  googleUsers: number;
}

export interface FirebaseStats {
  newComments: number;
  totalComments: number;
}

export interface VercelStats {
  deployments: number;
  bandwidth: number | null; // bytes
  serverlessCalls: number | null;
}

// --- Aggregated ---

export interface StatsSnapshot {
  timestamp: string;
  type: ReportType;
  ga4: GA4Stats | null;
  gateway: GatewayStats | null;
  firebase: FirebaseStats | null;
  vercel: VercelStats | null;
}

export interface StatsReport {
  type: ReportType;
  date: string;
  current: StatsSnapshot;
  previous: StatsSnapshot | null;
  aiSummary: string | null;
}
