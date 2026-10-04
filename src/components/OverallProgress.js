import React from "react";

function OverallProgress({ habits }) {
  const today = new Date();

  // Convert Date to local YYYY-MM-DD
  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Generate the last 30 calendar days
  const last30Days = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);

    date.setDate(today.getDate() - i);

    last30Days.push(formatLocalDate(date));
  }

  // Count only completions from the last 30 days
  let totalCompleted = 0;

  habits.forEach((habit) => {
    const completedDates = habit.completedDates || [];

    totalCompleted += completedDates.filter((date) =>
      last30Days.includes(date)
    ).length;
  });

  // Maximum possible completions
  const totalPossible = habits.length * 30;

  // Completion percentage
  const percentage =
    totalPossible === 0
      ? 0
      : Math.min(
          100,
          Number(
            ((totalCompleted / totalPossible) * 100).toFixed(1)
          )
        );

  return (
    <div className="overall-progress">

      <div className="overall-progress-header">

        <div>
          <span className="overall-progress-eyebrow">
            30-DAY OVERVIEW
          </span>

          <h2>📈 30-Day Progress</h2>

          <p>
            Your habit consistency over the last 30 days.
          </p>
        </div>

        <div className="overall-progress-badge">
          {percentage}%
        </div>

      </div>

      <div className="overall-progress-content">

        <div className="overall-progress-top">

          <span>
            30-Day Completion
          </span>

          <strong>
            {totalCompleted} / {totalPossible}
          </strong>

        </div>

        <div className="overall-progress-bar">

          <div
            className="overall-progress-fill"
            style={{
              width: `${percentage}%`,
            }}
          ></div>

        </div>

        <div className="overall-progress-bottom">

          <strong>
            {percentage}% Completed
          </strong>

          <span>
            {totalCompleted} completions
          </span>

        </div>

      </div>

    </div>
  );
}

export default OverallProgress;