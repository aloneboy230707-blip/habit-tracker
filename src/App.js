import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [habitName, setHabitName] = useState("");

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Add Habit
  const addHabit = () => {
    if (habitName.trim() === "") return;

    const newHabit = {
      id: Date.now(),
      name: habitName,
      entries: []
    };

    setHabits([...habits, newHabit]);
    setHabitName("");
  };

  // Mark Today
  const markToday = (id) => {
    const today = new Date().toISOString().split("T")[0];

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === id) {
          const exists = h.entries.find(e => e.date === today);
          if (exists) return h;

          return {
            ...h,
            entries: [...h.entries, { date: today }]
          };
        }
        return h;
      })
    );
  };

  // Delete Habit
  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  // 🔥 Streak
  const calculateStreak = (entries) => {
    const sorted = [...entries].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < sorted.length; i++) {
      const entryDate = new Date(sorted[i].date);

      const diff =
        (currentDate - entryDate) / (1000 * 60 * 60 * 24);

      if (Math.floor(diff) === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  // 📅 Last 7 Days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  };

  // 📊 Completion %
  const getCompletion = (entries) => {
    const last7 = getLast7Days();
    const doneDays = last7.filter(day =>
      entries.find(e => e.date === day)
    ).length;

    return Math.round((doneDays / 7) * 100);
  };

  return (
    <div className="container">
      <h1>Habit Tracker</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter habit..."
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
        <button className="add-btn" onClick={addHabit}>
          Add
        </button>
      </div>

      {habits.map((h) => (
        <div key={h.id} className="habit-card">
          <h3>{h.name}</h3>

          <div className="btn-group">
            <button
              className="mark-btn"
              onClick={() => markToday(h.id)}
            >
              Mark Today
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteHabit(h.id)}
            >
              Delete
            </button>
          </div>

          <div className="streak">
            🔥 Streak: {calculateStreak(h.entries)}
          </div>

          {/* 📅 Calendar */}
          <div className="calendar">
            {getLast7Days().map((day, i) => {
              const done = h.entries.find(e => e.date === day);

              const label = new Date(day)
                .toLocaleDateString("en-US", { weekday: "short" })[0];

              return (
                <div
                  key={i}
                  className="day-box"
                  style={{
                    backgroundColor: done ? "#4caf50" : "#444"
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>

          {/* 📊 Progress */}
          <div className="progress">
            Progress: {getCompletion(h.entries)}%
          </div>

          <div className="entries">
            {h.entries.map((e, i) => (
              <div key={i}>{e.date}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;