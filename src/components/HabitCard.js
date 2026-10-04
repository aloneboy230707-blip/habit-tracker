import React, { useState } from "react";

const getCategoryIcon = (category) => {
  switch (category) {
    case "Fitness":
      return "💪";
    case "Study":
      return "📚";
    case "Health":
      return "❤️";
    case "Reading":
      return "📖";
    case "Meditation":
      return "🧘";
    case "Work":
      return "💼";
    case "Finance":
      return "💰";
    default:
      return "📌";
  }
};

const getDifficultyClass = (difficulty) => {
  switch (difficulty) {
    case "Hard":
      return "hard";
    case "Medium":
      return "medium";
    default:
      return "easy";
  }
};

function HabitCard({
  item,
  editingId,
  editedText,
  setEditedText,
  setEditingId,
  completeHabit,
  editHabit,
  deleteHabit,
  updateNotes,
}) {
  const [noteText, setNoteText] = useState(item.notes || "");

const validCompletedDates = (
  item.completedDates || []
)
  .filter(
    (date) => !isNaN(new Date(date))
  )
  .sort();

const fallbackCreatedDate =
  validCompletedDates.length > 0
    ? new Date(
        `${validCompletedDates[0]}T00:00:00`
      )
    : new Date();

const createdDate =
  item.createdAt &&
  !isNaN(new Date(item.createdAt))
    ? new Date(item.createdAt)
    : fallbackCreatedDate;

const today = new Date();

const diffTime = Math.max(
  0,
  today - createdDate
);

const daysSinceCreated = Math.max(
  1,
  Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  ) + 1
);

const completedCount = new Set(
  validCompletedDates
).size;

const progress =
  daysSinceCreated <= 0
    ? 0
    : Math.min(
        100,
        (completedCount / daysSinceCreated) * 100
      );

  const streak = item.streak || 0;
  const freezeCount = item.freezeCount || 0;
  const xp = item.xp || 0;
  const missedDays = item.missedDays || 0;
  const longestStreak = item.longestStreak || 0;

  const category = item.category || "General";
  const difficulty = item.difficulty || "Easy";

  const progressClass =
    progress < 30
      ? "low"
      : progress < 70
      ? "medium"
      : "high";

  return (
    <article
      className={`premium-habit-card ${
        category.toLowerCase()
      }`}
    >
      {/* TOP SECTION */}
      <div className="habit-card-top">
        <div className="habit-card-identity">
          <div className="habit-category-icon">
            {getCategoryIcon(category)}
          </div>

          <div className="habit-title-area">
            {editingId === item.id ? (
              <input
                className="habit-edit-input"
                value={editedText}
                onChange={(e) =>
                  setEditedText(e.target.value)
                }
                autoFocus
              />
            ) : (
              <>
                <h3>{item.name}</h3>

                <div className="habit-meta">
                  <span className="habit-category-badge">
                    {getCategoryIcon(category)} {category}
                  </span>

                  <span
                    className={`habit-difficulty-badge ${getDifficultyClass(
                      difficulty
                    )}`}
                  >
                    {difficulty === "Hard"
                      ? "🔴"
                      : difficulty === "Medium"
                      ? "🟡"
                      : "🟢"}{" "}
                    {difficulty}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="habit-status">
          <span className="habit-status-dot"></span>
          Active
        </div>
      </div>

      {/* STATS */}
      <div className="habit-stat-grid">
        <div className="habit-stat-card">
          <span className="habit-stat-icon">🔥</span>

          <div>
            <small>Streak</small>
            <strong>{streak}</strong>
          </div>
        </div>

        <div className="habit-stat-card">
          <span className="habit-stat-icon">⭐</span>

          <div>
            <small>XP</small>
            <strong>{xp}</strong>
          </div>
        </div>

        <div className="habit-stat-card">
          <span className="habit-stat-icon">🏆</span>

          <div>
            <small>Best</small>
            <strong>{longestStreak}</strong>
          </div>
        </div>

        <div className="habit-stat-card">
          <span className="habit-stat-icon">📅</span>

          <div>
            <small>Completed</small>
            <strong>{completedCount}</strong>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="habit-progress-section">
        <div className="habit-progress-header">
          <div>
            <span>Consistency</span>
            <small>
              {completedCount} of {daysSinceCreated} days
            </small>
          </div>

          <strong>{progress.toFixed(0)}%</strong>
        </div>

        <div className="habit-progress-track">
          <div
            className={`habit-progress-fill ${progressClass}`}
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>

      {/* SECONDARY INFORMATION */}
      <div className="habit-info-row">
        <div>
          <span>❌</span>
          <small>Missed</small>
          <strong>{missedDays}</strong>
        </div>

        <div>
          <span>❄️</span>
          <small>Freezes</small>
          <strong>{freezeCount}</strong>
        </div>

        <div>
          <span>📆</span>
          <small>Days Active</small>
          <strong>{daysSinceCreated}</strong>
        </div>

        <div>
          <span>🗓️</span>
          <small>Tracking Since</small>
          <strong>
            {createdDate.toLocaleDateString()}
          </strong>
        </div>
      </div>

      {/* NOTES */}
      <details className="premium-notes-box">
        <summary>
          <span>📝 Notes</span>
          <span className="notes-toggle">
            View / Edit
          </span>
        </summary>

        <div className="notes-content">
          <textarea
            placeholder="Write something about this habit..."
            value={noteText}
            onChange={(e) =>
              setNoteText(e.target.value)
            }
          />

          <button
            className="save-notes-btn"
            onClick={(e) => {
              e.stopPropagation();

              updateNotes(
                item.id,
                noteText
              );
            }}
          >
            💾 Save Notes
          </button>
        </div>
      </details>

      {/* ACTIONS */}
      <div className="habit-card-actions">
        <button
          className="complete-btn premium-complete-btn"
          onClick={(e) => {
            e.stopPropagation();

            completeHabit(
              item.id,
              item.streak,
              item.completedDates,
              item.longestStreak,
              item.missedDays,
              item.freezeCount,
              item.xp,
              item.streakHistory,
              item.difficulty
            );
          }}
        >
          ✓ Complete
        </button>

        {editingId === item.id ? (
          <button
            className="edit-btn premium-save-btn"
            onClick={(e) => {
              e.stopPropagation();

              editHabit(
                item.id,
                editedText,
                setEditingId,
                setEditedText
              );
            }}
          >
            💾 Save
          </button>
        ) : (
          <button
            className="edit-btn premium-edit-btn"
            onClick={(e) => {
              e.stopPropagation();

              setEditingId(item.id);
              setEditedText(item.name);
            }}
          >
            ✏️ Edit
          </button>
        )}

        <button
          className="delete-btn premium-delete-btn"
          onClick={(e) => {
            e.stopPropagation();

            deleteHabit(item.id);
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}

export default HabitCard;