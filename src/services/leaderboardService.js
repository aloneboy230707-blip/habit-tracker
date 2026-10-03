import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../firebase";

// SAVE USER TO LEADERBOARD
export const updateLeaderboard =
  async (
    uid,
    name,
    photoURL,
    totalXP,
    highestStreak
  ) => {

    await setDoc(
      doc(
        db,
        "leaderboard",
        uid
      ),
      {
        uid,
        name,
        photoURL,
        totalXP,
        highestStreak,
      },
      {
        merge: true,
      }
    );

  };

// TOP XP USERS
export const getTopXPUsers =
  async () => {

    const q = query(
      collection(
        db,
        "leaderboard"
      ),
      orderBy(
        "totalXP",
        "desc"
      ),
      limit(10)
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

  };

// TOP STREAK USERS
export const getTopStreakUsers =
  async () => {

    const q = query(
      collection(
        db,
        "leaderboard"
      ),
      orderBy(
        "highestStreak",
        "desc"
      ),
      limit(10)
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

  };