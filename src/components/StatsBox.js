import React from "react";

function StatsBox({ weeklyCompleted, habits }) {
  const totalHabits = habits.length;

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const completedToday = habits.filter((habit) =>
    (habit.completedDates || []).includes(today)
  ).length;

  const completionPercentage =
    totalHabits === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (completedToday / totalHabits) * 100
          )
        );

  return (
    <section className="premium-stats-box">

      {/* Header */}
      <div className="stats-box-header">

        <div>
          <span className="stats-box-eyebrow">
            WEEKLY OVERVIEW
          </span>

          <h2>
            📊 Weekly Stats
          </h2>

          <p>
            A quick look at your current habit activity.
          </p>
        </div>

        <div className="stats-box-badge">
          📈 Live
        </div>

      </div>


      {/* Stats */}
      <div className="stats-box-grid">

        {/* Weekly Completions */}
        <div className="stats-box-stat">

          <div className="stats-box-stat-icon">
            ✅
          </div>

          <div className="stats-box-stat-content">

            <span>
              Weekly Completions
            </span>

            <strong>
              {weeklyCompleted}
            </strong>

          </div>

        </div>


        {/* Today's Completion */}
        <div className="stats-box-stat">

          <div className="stats-box-stat-icon">
            🎯
          </div>

          <div className="stats-box-stat-content">

            <span>
              Today's Completion
            </span>

            <strong>
              {completionPercentage}%
            </strong>

          </div>

        </div>

      </div>


      {/* Progress */}
      <div className="stats-box-progress">

        <div className="stats-box-progress-top">

          <span>
            Today's habit progress
          </span>

          <strong>
            {completedToday}/{totalHabits}
          </strong>

        </div>

        <div className="stats-box-progress-track">

          <div
            className="stats-box-progress-fill"
            style={{
              width: `${completionPercentage}%`,
            }}
          />

        </div>

      </div>


      {/* Footer */}
      <div
        className={`stats-box-footer ${
          completionPercentage === 100
            ? "stats-box-footer-complete"
            : ""
        }`}
      >

        <span>
          {completionPercentage === 100
            ? "🏆"
            : "🔥"}
        </span>

        <span>
          {completionPercentage === 100
            ? "All habits completed today. Excellent consistency!"
            : "Keep completing your habits to improve today's progress."}
        </span>

      </div>

    </section>
  );
}

export default StatsBox;