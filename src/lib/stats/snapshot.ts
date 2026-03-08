/**
 * Stats snapshot persistence via Firestore.
 * Stores/retrieves snapshots for delta comparison.
 */

import { getAdminDb } from "@/lib/firebase-admin";
import type { StatsSnapshot, ReportType } from "./types";

const COLLECTION = "stats-snapshots";

/** Save current snapshot for future delta comparison. */
export async function saveSnapshot(snapshot: StatsSnapshot): Promise<void> {
  try {
    const db = getAdminDb();
    const docId = `${snapshot.type}-${snapshot.timestamp.slice(0, 10)}`;
    await db.collection(COLLECTION).doc(docId).set(snapshot);
  } catch (error) {
    console.error("[stats/snapshot] save error:", error);
  }
}

/** Load the previous snapshot for comparison. */
export async function loadPreviousSnapshot(
  type: ReportType,
  currentDate: string, // YYYY-MM-DD
): Promise<StatsSnapshot | null> {
  try {
    const db = getAdminDb();

    // For daily: get yesterday's snapshot
    // For weekly: get last week's snapshot
    const current = new Date(currentDate);
    const offset = type === "daily" ? 1 : 7;
    const prev = new Date(current);
    prev.setDate(prev.getDate() - offset);
    const prevDateStr = prev.toISOString().slice(0, 10);

    const docId = `${type}-${prevDateStr}`;
    const doc = await db.collection(COLLECTION).doc(docId).get();

    if (!doc.exists) {
      // Fallback: find the most recent snapshot of this type before current
      const query = await db
        .collection(COLLECTION)
        .where("type", "==", type)
        .where("timestamp", "<", currentDate)
        .orderBy("timestamp", "desc")
        .limit(1)
        .get();

      if (query.empty) return null;
      return query.docs[0].data() as StatsSnapshot;
    }

    return doc.data() as StatsSnapshot;
  } catch (error) {
    console.error("[stats/snapshot] load error:", error);
    return null;
  }
}
