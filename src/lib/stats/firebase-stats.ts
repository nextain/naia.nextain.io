/**
 * Firebase Firestore stats collector.
 * Fetches comment counts.
 */

import { getAdminDb } from "@/lib/firebase-admin";
import type { FirebaseStats } from "./types";

export async function collectFirebaseStats(
  periodStart: string, // ISO date string
): Promise<FirebaseStats | null> {
  try {
    const db = getAdminDb();
    const commentsRef = db.collection("comments");

    // Total comments (not deleted)
    const totalSnap = await commentsRef
      .where("deleted", "==", false)
      .count()
      .get();
    const totalComments = totalSnap.data().count;

    // New comments in period
    const startDate = new Date(periodStart);
    const newSnap = await commentsRef
      .where("deleted", "==", false)
      .where("createdAt", ">=", startDate)
      .count()
      .get();
    const newComments = newSnap.data().count;

    return { newComments, totalComments };
  } catch (error) {
    console.error("[stats/firebase] error:", error);
    return null;
  }
}
