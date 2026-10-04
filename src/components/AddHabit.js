import React from "react";

function AddHabit({
  habit,
  setHabit,
  addHabit,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  reminderTime,
  setReminderTime,
}) {
  return (
    <section className="premium-add-habit">
      <div className="add-habit-header">
        <div>
          <span className="add-habit-eyebrow">
            BUILD YOUR ROUTINE
          </span>

          <h1>Create a New Habit</h1>

          <p>
            Start small, stay consistent, and build a better routine.
          </p>
        </div>

        <div className="add-habit-icon">
          ✨
        </div>
      </div>

      <div className="add-habit-form">
        {/* Habit Name */}
        <div className="add-habit-field habit-name-field">
          <label>Habit Name</label>

          <div className="habit-input-wrapper">
            <span>🎯</span>

            <input
              type="text"
              placeholder="e.g. Read 20 pages"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div className="add-habit-field">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Fitness">💪 Fitness</option>
            <option value="Study">📚 Study</option>
            <option value="Health">❤️ Health</option>
            <option value="Reading">📖 Reading</option>
            <option value="Meditation">🧘 Meditation</option>
            <option value="Work">💼 Work</option>
            <option value="Finance">💰 Finance</option>
          </select>
        </div>

        {/* Difficulty */}
        <div className="add-habit-field">
          <label>Difficulty</label>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">🟢 Easy</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Hard">🔴 Hard</option>
          </select>
        </div>

        {/* Reminder */}
        <div className="add-habit-field">
          <label>Reminder</label>

          <div className="time-input-wrapper">
            <span>⏰</span>

            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="add-habit-footer">
        <div className="add-habit-tip">
          <span>💡</span>

          <span>
            Tip: Choose a habit that is small enough to complete consistently.
          </span>
        </div>

        <button
          className="premium-add-habit-button"
          onClick={addHabit}
          disabled={!habit.trim()}
        >
          <span>＋</span>
          Add Habit
        </button>
      </div>
    </section>
  );
}

export default AddHabit;