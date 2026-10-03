import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db }
from "../firebase";

export const saveProfile = async (
  uid,
  profile
) => {
  try {
    console.log("Saving profile for:", uid);

    await setDoc(
      doc(db, "users", uid),
      profile,
      { merge: true }
    );

    console.log("Profile saved");

  } catch (error) {
    console.error(
      "saveProfile error:",
      error
    );
  }
};

export const fetchProfile = async (
  uid
) => {
  try {
    console.log(
      "Fetching profile:",
      uid
    );

    const docRef =
      doc(db, "users", uid);

    const docSnap =
      await getDoc(docRef);

    console.log(
      "Profile exists:",
      docSnap.exists()
    );

    if (docSnap.exists()) {
      return docSnap.data();
    }

    return null;

  } catch (error) {
    console.error(
      "fetchProfile error:",
      error
    );
  }
};