import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  onSnapshot
} from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");
  const [xp, setXp] = useState(0);

  // =========================
  // AUTH LISTENER
  // =========================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  // =========================
  // REAL-TIME DATA
  // =========================
  useEffect(() => {
    if (!user) return;

    const habitsRef = collection(db, "users", user.uid, "habits");

    const unsubHabits = onSnapshot(habitsRef, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHabits(list);
    });

    const userRef = doc(db, "users", user.uid);

    const unsubUser = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setXp(docSnap.data().xp || 0);
      }
    });

    return () => {
      unsubHabits();
      unsubUser();
    };
  }, [user]);

  // =========================
  // LOGIN
  // =========================
  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    await signOut(auth);
  };

  // =========================
  // ADD HABIT
  // =========================
  const addHabit = async () => {
    if (!input.trim()) return;

    await addDoc(collection(db, "users", user.uid, "habits"), {
      name: input,
      streak: 0
    });

    setInput("");
  };

  // =========================
  // DELETE
  // =========================
  const deleteHabit = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "habits", id));
  };

  // =========================
  // MARK DONE
  // =========================
  const markDone = async (habit) => {
    const newXP = xp + 10;

    await setDoc(
      doc(db, "users", user.uid),
      { xp: newXP },
      { merge: true }
    );

    await setDoc(
      doc(db, "users", user.uid, "habits", habit.id),
      { streak: habit.streak + 1 },
      { merge: true }
    );
  };

  // =========================
  // CALCULATIONS
  // =========================
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  // =========================
  // UI
  // =========================
  if (!user) {
    return (
      <div className="app">
        <h1>🔥 Habit Tracker</h1>
        <button onClick={login}>Login with Google</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>🔥 Habit Tracker</h1>

      <button onClick={logout}>Logout</button>

      <h2>XP: {xp}</h2>
      <h3>Level: {level}</h3>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add habit"
      />
      <button onClick={addHabit}>Add</button>

      {habits.map((h) => (
        <div key={h.id} className="card">
          <h3>{h.name}</h3>
          <p>🔥 Streak: {h.streak}</p>

          <button onClick={() => markDone(h)}>Done</button>
          <button onClick={() => deleteHabit(h.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;