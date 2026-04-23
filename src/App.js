import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  const [habitInput, setHabitInput] = useState("");
  const [habits, setHabits] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ✅ LOAD (only once)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("habits");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHabits(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoaded(true);
  }, []);

  // ✅ SAVE (only after load)
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits, loaded]);

  // ✅ ADD
  const addHabit = () => {
    if (!habitInput.trim()) return;

    const newHabit = {
      id: Date.now(),
      name: habitInput.trim(),
      completedDates: [],
      streak: 0,
      lastCompleted: null
    };

    setHabits(prev => [...prev, newHabit]);
    setHabitInput("");
  };

  // ✅ COMPLETE
  const markComplete = (id) => {
    const today = new Date().toDateString();

    setHabits(prev =>
      prev.map(h => {
        if (h.id !== id) return h;
        if (h.completedDates.includes(today)) return h;

        let streak = 1;

        if (h.lastCompleted) {
          const diff =
            (new Date(today) - new Date(h.lastCompleted)) /
            (1000 * 60 * 60 * 24);

          if (diff === 1) streak = h.streak + 1;
        }

        return {
          ...h,
          completedDates: [...h.completedDates, today],
          streak,
          lastCompleted: today
        };
      })
    );
  };

  // ✅ DELETE
  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  // ✅ EDIT
  const editHabit = (id) => {
    const newName = prompt("Edit habit:");
    if (!newName) return;

    setHabits(prev =>
      prev.map(h =>
        h.id === id ? { ...h, name: newName } : h
      )
    );
  };

  // ✅ RESET
  const resetAll = () => {
    if (window.confirm("Delete all habits?")) {
      localStorage.removeItem("habits");
      setHabits([]);
    }
  };

  // ✅ FILTER + SEARCH
  const filteredHabits = habits.filter(h => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());

    if (filter === "active") return matchSearch && h.streak > 0;
    if (filter === "inactive") return matchSearch && h.streak === 0;

    return matchSearch;
  });

  // ✅ ANALYTICS
  const getStats = () => {
    let total = habits.length;
    let completions = 0;
    let longest = 0;
    let days = [0,0,0,0,0,0,0];

    habits.forEach(h => {
      completions += h.completedDates.length;
      if (h.streak > longest) longest = h.streak;

      h.completedDates.forEach(d => {
        const day = new Date(d).getDay();
        days[day]++;
      });
    });

    return { total, completions, longest, days };
  };

  const stats = getStats();

  const chartData = {
    labels: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    datasets: [
      {
        label: "Weekly Activity",
        data: stats.days
      }
    ]
  };

  // ✅ EXPORT
  const exportData = () => {
    const dataStr = JSON.stringify(habits);
    navigator.clipboard.writeText(dataStr);
    alert("Copied to clipboard");
  };

  // ✅ IMPORT
  const importData = () => {
    const input = prompt("Paste data:");
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed)) {
        setHabits(parsed);
      }
    } catch {
      alert("Invalid data");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
      <h1>🔥 Advanced Habit Tracker</h1>

      {/* INPUT */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
          placeholder="New habit"
          style={{ flex: 1 }}
        />
        <button onClick={addHabit}>Add</button>
      </div>

      {/* SEARCH + FILTER */}
      <div style={{ marginTop: 10 }}>
        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* ACTIONS */}
      <div style={{ marginTop: 10 }}>
        <button onClick={resetAll}>Reset</button>
        <button onClick={exportData}>Export</button>
        <button onClick={importData}>Import</button>
      </div>

      {/* STATS */}
      <h2>📊 Analytics</h2>
      <p>Total: {stats.total}</p>
      <p>Completions: {stats.completions}</p>
      <p>Longest Streak: {stats.longest}</p>

      <Bar data={chartData} />

      {/* LIST */}
      <ul>
        {filteredHabits.map(h => (
          <li key={h.id}>
            <b>{h.name}</b> | 🔥 {h.streak}
            <br />
            <button onClick={() => markComplete(h.id)}>Done</button>
            <button onClick={() => editHabit(h.id)}>Edit</button>
            <button onClick={() => deleteHabit(h.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;