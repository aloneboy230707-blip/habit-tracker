import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

// Save stats
export const saveStats = async (
  uid,
  stats
) => {
  await setDoc(
    doc(
      db,
      "users",
      uid,
      "stats",
      "summary"
    ),
    stats,
    {
      merge: true,
    }
  );
};

// Fetch stats
export const fetchStats =
  async (uid) => {

    const docRef = doc(
      db,
      "users",
      uid,
      "stats",
      "summary"
    );

    const docSnap =
      await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return {
      totalXP: 0,
      totalCompleted: 0,
      highestStreak: 0,
      totalHabits: 0,
    };
};