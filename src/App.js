import React, { useState, useEffect } from "react";
import "./App.css";

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

function App() {
  const [habits, setHabits] = useState([]);
  const [input, setInput] = useState("");

  // 🔥 CHECK DB + LOAD
  useEffect(() => {
    console.log("DB VALUE:", db);
    loadHabits();
  }, []);

  // ===== LOAD DATA =====
  const loadHabits = async () => {
    try {
      if (!db) {
        console.error("DB NOT INITIALIZED");
        return;
      }

      const querySnapshot = await getDocs(collection(db, "habits"));

      const list = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setHabits(list);
    } catch (error) {
      console.error("LOAD ERROR:", error);
    }
  };

  // ===== ADD HABIT =====
  const addHabit = async () => {
    console.log("CLICKED");

    if (!input.trim()) return;

    try {
      if (!db) {
        console.error("DB NOT INITIALIZED");
        return;
      }

      await addDoc(collection(db, "habits"), {
        name: input,
        history: {},
        createdAt: new Date(),
      });
      const testDB = async () => {
  try {
    console.log("TEST START");

    const ref = await addDoc(collection(db, "test"), {
      name: "test data",
      time: new Date()
    });

    console.log("SUCCESS ID:", ref.id);

  } catch (err) {
    console.error("TEST ERROR:", err);
  }
};
      console.log("ADDED SUCCESS");

      setInput("");
      loadHabits();
    } catch (error) {
      console.error("ADD ERROR:", error);
    }
  };

  // ===== MARK DONE =====
  const markDone = async (habit) => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const ref = doc(db, "habits", habit.id);

      const updatedHistory = habit.history || {};
      updatedHistory[today] = !updatedHistory[today];

      await updateDoc(ref, { history: updatedHistory });

      loadHabits();
    } catch (error) {
      console.error("UPDATE ERROR:", error);
    }
  };

  // ===== DELETE =====
  const deleteHabit = async (id) => {
    try {
      await deleteDoc(doc(db, "habits", id));
      loadHabits();
    } catch (error) {
      console.error("DELETE ERROR:", error);
    }
  };

  return (
    <div className="container">
      <h1>🔥 Habit Tracker</h1>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="jayaram"
        />
        <button onClick={addHabit}>Add</button>
      </div>

      {habits.length === 0 ? (
        <p>No habits yet</p>
      ) : (
        habits.map((h) => (
          <div key={h.id} className="card">
            <h3>{h.name}</h3>

            <button onClick={() => markDone(h)}>Done</button>
            <button onClick={() => deleteHabit(h.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;