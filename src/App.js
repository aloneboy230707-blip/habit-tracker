import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./App.css";

function App() {

  // ===== STATE =====
  const [habits, setHabits] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("habits")) || [];
    } catch {
      return [];
    }
  });

  const [xp, setXp] = useState(() => {
    return Number(localStorage.getItem("xp")) || 0;
  });

  const [input, setInput] = useState("");

  // ===== SAVE =====
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("xp", xp);
  }, [xp]);

  // ===== NOTIFICATION =====
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = (text) => {
    if (Notification.permission === "granted") {
      new Notification("Habit Reminder 🔔", {
        body: text,
        requireInteraction: true
      });
    }
  };

  // ===== REMINDER =====
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

      habits.forEach(h => {
        if (h.reminderTime === time) {
          sendNotification(`Do your habit: ${h.name}`);
        }
      });

    }, 5000);

    return () => clearInterval(interval);
  }, [habits]);

  // ===== ADD =====
  const addHabit = () => {
    if (!input.trim()) return;

    setHabits([
      ...habits,
      {
        name: input,
        history: {},
        reminderTime: "07:00",
        days: []
      }
    ]);

    setInput("");
  };

  // ===== DONE + XP =====
  const markDone = (index) => {
    const today = new Date().toISOString().split("T")[0];

    const updated = [...habits];
    updated[index].history = updated[index].history || {};

    const done = updated[index].history[today];

    updated[index].history[today] = !done;

    if (!done) setXp(x => x + 10);
    else setXp(x => Math.max(x - 10, 0));

    setHabits(updated);
  };

  // ===== DELETE =====
  const deleteHabit = (i) => {
    setHabits(habits.filter((_, idx) => idx !== i));
  };

  // ===== STREAK =====
  const calculateStreak = (habit) => {
    let streak = 0;
    let d = new Date();

    while (true) {
      const date = d.toISOString().split("T")[0];
      const day = d.getDay();

      const valid =
        habit.days.length === 0 || habit.days.includes(day);

      if (valid && habit.history[date]) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else if (!valid) {
        d.setDate(d.getDate() - 1);
      } else break;
    }

    return streak;
  };

  const today = new Date().getDay();

  // ===== XP =====
  const level = Math.floor(xp / 100);
  const progress = xp % 100;

  // ===== STATS =====
  const todayDate = new Date().toISOString().split("T")[0];

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.history?.[todayDate]).length;

  const completionRate = totalHabits === 0
    ? 0
    : Math.round((completedToday / totalHabits) * 100);

  const bestStreak = Math.max(...habits.map(h => calculateStreak(h)), 0);

  const getWeeklyData = () => {
    let data = [];

    for (let i = 6; i >= 0; i--) {
      let d = new Date();
      d.setDate(d.getDate() - i);

      const dateStr = d.toISOString().split("T")[0];

      const count = habits.filter(h => h.history?.[dateStr]).length;

      data.push({
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        count
      });
    }

    return data;
  };

  const weeklyData = getWeeklyData();

  return (
    <div className="container">

      <h1>🔥 Habit Tracker</h1>

      {/* XP */}
      <div className="xp-box">
        <h2>Level {level}</h2>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p>{progress}/100 XP</p>
      </div>

      {/* DASHBOARD */}
      <div className="dashboard">
        <div className="stat"><h4>Total</h4><p>{totalHabits}</p></div>
        <div className="stat"><h4>Today</h4><p>{completedToday}</p></div>
        <div className="stat"><h4>Rate</h4><p>{completionRate}%</p></div>
        <div className="stat"><h4>Best</h4><p>{bestStreak}</p></div>
      </div>

      {/* CHART */}
      <div className="chart">
        {weeklyData.map((d, i) => (
          <div key={i} className="bar-box">
            <div className="bar" style={{ height: `${d.count * 20}px` }}></div>
            <span>{d.day}</span>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="input-box">
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button onClick={addHabit}>Add</button>
      </div>

      <button onClick={() => sendNotification("Test!")}>
        Test Notification
      </button>

      {/* HABITS */}
      {habits
        .filter(h => h.days.length === 0 || h.days.includes(today))
        .map((habit, i) => {

          const heatmapData = Object.keys(habit.history || {}).map(date => ({
            date,
            count: habit.history[date] ? 1 : 0
          }));

          return (
            <div key={i} className="card">

              <h3>{habit.name}</h3>
              <p>🔥 {calculateStreak(habit)} days</p>

              <input
                type="time"
                value={habit.reminderTime}
                onChange={(e) => {
                  const updated = [...habits];
                  updated[i].reminderTime = e.target.value;
                  setHabits(updated);
                }}
              />

              {/* DAYS */}
              <div className="days">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d, idx) => (
                  <button
                    key={idx}
                    className={habit.days.includes(idx) ? "active" : ""}
                    onClick={() => {
                      const updated = [...habits];
                      if (updated[i].days.includes(idx)) {
                        updated[i].days =
                          updated[i].days.filter(x => x !== idx);
                      } else {
                        updated[i].days.push(idx);
                      }
                      setHabits(updated);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="buttons">
                <button onClick={() => markDone(i)}>Done</button>
                <button onClick={() => deleteHabit(i)}>Delete</button>
              </div>

              <CalendarHeatmap
                startDate={new Date(new Date().setDate(new Date().getDate() - 30))}
                endDate={new Date()}
                values={heatmapData}
                classForValue={(v) => {
                  if (!v) return "color-empty";
                  return v.count ? "color-green" : "color-red";
                }}
              />
            </div>
          );
        })}
    </div>
  );
}

export default App;