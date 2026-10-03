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
    <div className="add-box">

      <input
        type="text"
        placeholder="Enter habit"
        value={habit}
        onChange={(e) =>
          setHabit(e.target.value)
        }
      />

      <input
        type="time"
        value={reminderTime}
        onChange={(e) =>
          setReminderTime(e.target.value)
        }
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="Fitness">
          💪 Fitness
        </option>

        <option value="Study">
          📚 Study
        </option>

        <option value="Health">
          ❤️ Health
        </option>

        <option value="Reading">
          📖 Reading
        </option>

        <option value="Meditation">
          🧘 Meditation
        </option>

        <option value="Work">
          💼 Work
        </option>

        <option value="Finance">
          💰 Finance
        </option>
      </select>

      <select
        value={difficulty}
        onChange={(e) =>
          setDifficulty(e.target.value)
        }
      >
        <option value="Easy">
          🟢 Easy
        </option>

        <option value="Medium">
          🟡 Medium
        </option>

        <option value="Hard">
          🔴 Hard
        </option>
      </select>

      <button onClick={addHabit}>
        Add
      </button>

    </div>
  );
}

export default AddHabit;