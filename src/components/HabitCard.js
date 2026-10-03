import React, {
  useState,
} from "react";

const getCategoryIcon = (category) => {

  switch(category) {

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

  const [noteText, setNoteText] =
  useState(item.notes || "");
  // Get habit creation date
const createdDate =
  item.createdAt &&
  !isNaN(new Date(item.createdAt))
    ? new Date(item.createdAt)
    : new Date();

// Today's date
const today = new Date();

// Calculate difference in milliseconds
const diffTime = today - createdDate;

// Convert to number of days
const daysSinceCreated =
  Math.max(
    1,
    Math.floor(
      diffTime /
      (1000 * 60 * 60 * 24)
    ) + 1
  );
  const completedCount =
  new Set(item.completedDates || []).size;

// Calculate progress percentage
const progress =
  Math.min(
    100,
    (completedCount / daysSinceCreated) * 100
  );


  return (

    <div
  className={`habit-card ${
  item.category
    ? item.category.toLowerCase()
    : "general"
}`}
>

      <div className="habit-left">

        <div>

          {editingId === item.id ? (

            <input
              value={editedText}
              onChange={(e) =>
                setEditedText(
                  e.target.value
                )
              }
            />

          ) : (

           <>
  <h3>
    {getCategoryIcon(item.category)}
    {" "}
    {item.name}
  </h3>

  <div className="category-badge">
    {item.category}
  </div>
</>


          )}

          <p>
            <span className="label">
              🔥 Streak
            </span>

            : {item.streak}
          </p>
          <p>
  <span className="label">
    ❄️ Freeze
  </span>

  : {item.freezeCount || 0}
</p>
<p>
  <span className="label">
    ⭐ XP
  </span>

  : {item.xp || 0}
</p>

          <p>
            <span className="label">
              ❌ Missed Days
            </span>

            : {item.missedDays || 0}
          </p>

          <p>
            <span className="label">
              🏆 Longest
            </span>

            : {item.longestStreak || 0}
          </p>

          <details className="notes-box">

            <summary>
              📝 Notes
            </summary>

            <textarea
              placeholder="Write notes..."
              value={noteText}
              onChange={(e) =>
                setNoteText(
                  e.target.value
                )
              }
            />

            <button
              onClick={() =>
                updateNotes(
                  item.id,
                  noteText
                )
              }
            >
              Save Notes
            </button>

          </details>

          <p>
  <span className="label">
    📅 Completed
  </span>

  : {completedCount}
</p>

<p>
  <span className="label">
    📆 Days Active
  </span>

  : {daysSinceCreated}
</p>
<p>
  <span className="label">
    🗓️ Started
  </span>

  : {createdDate.toLocaleDateString()}
</p>

<p>
  <span className="label">
    ✅ Completion
  </span>

  : {completedCount}/{daysSinceCreated}
</p>

<div className="progress-section">

  <p>

    <span className="label">
      📈 Progress
    </span>

    : {progress.toFixed(0)}%

  </p>

  <div className="progress-bar">

    <div
      className={`progress-fill ${
        progress < 30
          ? "low"
          : progress < 70
          ? "medium"
          : "high"
      }`}
      style={{
        width: `${progress}%`,
      }}
    ></div>

  </div>

</div>

</div>

      </div>

      <div className="habit-right">

        <button
          className="complete-btn"
          onClick={() =>
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
)
          }
        >
          Complete
        </button>

        {editingId === item.id ? (

          <button
  onClick={() =>
    editHabit(
      item.id,
      editedText,
      setEditingId,
      setEditedText
    )
  }
>
  Save
</button>

        ) : (

          <button
            className="edit-btn"
            onClick={() => {

              setEditingId(item.id);

              setEditedText(
                item.name
              );

            }}
          >
            Edit
          </button>

        )}

        <button
          className="delete-btn"
          onClick={() =>
            deleteHabit(item.id)
          }
        >
          Delete
        </button>

      </div>

    </div>

  );

}

export default HabitCard;