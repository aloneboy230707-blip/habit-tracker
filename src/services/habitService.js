import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db, auth } from "../firebase";

// FETCH HABITS
export const fetchHabits = async (uid) => {
  try {
    const q = query(
      collection(db, "habits"),
      where("uid", "==", uid)
    );

    const querySnapshot =
      await getDocs(q);

    const habitsArray = [];

    querySnapshot.forEach((docItem) => {
      habitsArray.push({
        id: docItem.id,
        ...docItem.data(),
      });
    });

    return habitsArray.sort(
  (a, b) =>
    (a.order || 0) -
    (b.order || 0)
);

  } catch (error) {
    console.log(error);
    return [];
  }
};

// ADD HABIT
export const addHabitService =
async (habitData) => {

  console.log(
    "Current User:",
    auth.currentUser
  );

  console.log(
    "Habit Data:",
    habitData
  );

  if (!habitData.uid) {
    throw new Error(
      "Habit uid missing"
    );
  }

  try {
    await addDoc(
      collection(db, "habits"),
      habitData
    );

    console.log(
      "Habit added successfully"
    );
  } catch (error) {
    console.log(
      "Firestore Error Code:",
      error.code
    );

    console.log(
      "Firestore Error Message:",
      error.message
    );

    throw error;
  }
};

// UPDATE HABIT
export const updateHabitService =
  async (id, updatedData) => {

    const habitRef = doc(
      db,
      "habits",
      id
    );

    await updateDoc(
      habitRef,
      updatedData
    );

};

// DELETE HABIT
export const deleteHabitService =
  async (id) => {

    await deleteDoc(
      doc(db, "habits", id)
    );

};


// DELETE ALL HABITS
export const deleteAllHabitsService =
  async (uid) => {

    const q = query(
      collection(db, "habits"),
      where("uid", "==", uid)
    );

    const snapshot =
      await getDocs(q);

    for (const item of snapshot.docs) {

      await deleteDoc(
        doc(
          db,
          "habits",
          item.id
        )
      );

    }

};

// IMPORT HABITS
export const importHabitsService =
  async (habits) => {

    for (const habit of habits) {

      const {
        id,
        ...habitData
      } = habit;

      await addDoc(
        collection(
          db,
          "habits"
        ),
        habitData
      );

    }

};