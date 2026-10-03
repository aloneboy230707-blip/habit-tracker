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
        collection(db, "habits"),
        habitData
      );

    }

};