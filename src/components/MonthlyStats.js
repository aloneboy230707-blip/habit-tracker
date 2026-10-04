import React from "react";

function MonthlyStats({ habits }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let completed = 0;
  let missed = 0;

  habits.forEach((habit) => {
    (habit.completedDates || []).forEach((date) => {
      const d = new Date(date);

      if (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      ) {
        completed++;
      }
    });

    missed += habit.missedDays || 0;
  });

  const total = completed + missed;

  const percentage =
    total === 0
      ? 0
      : Math.min(
          100,
          Number(((completed / total) * 100).toFixed(1))
        );

  const monthName = new Date().toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  return (
    <section className="premium-monthly-stats">

      {/* Header */}
      <div className="monthly-stats-header">

        <div>
          <span className="monthly-stats-eyebrow">
            MONTHLY OVERVIEW
          </span>

          <h2>
            📅 {monthName} {currentYear}
          </h2>

          <p>
            Your habit activity for the current month.
          </p>
        </div>

        <div className="monthly-stats-badge">
          📊 {percentage}%
        </div>

      </div>


      {/* Statistics */}
      <div className="monthly-stats-grid">

        <div className="monthly-stat-card">

          <div className="monthly-stat-icon completed">
            ✅
          </div>

          <div className="monthly-stat-content">

            <span>
              Completed
            </span>

            <strong>
              {completed}
            </strong>

          </div>

        </div>


        <div className="monthly-stat-card">

          <div className="monthly-stat-icon missed">
            ❌
          </div>

          <div className="monthly-stat-content">

            <span>
              Missed
            </span>

            <strong>
              {missed}
            </strong>

          </div>

        </div>


        <div className="monthly-stat-card">

          <div className="monthly-stat-icon progress">
            📈
          </div>

          <div className="monthly-stat-content">

            <span>
              Completion
            </span>

            <strong>
              {percentage}%
            </strong>

          </div>

        </div>

      </div>


      {/* Progress */}
      <div className="monthly-stats-progress">

        <div className="monthly-stats-progress-top">

          <span>
            Monthly completion
          </span>

          <strong>
            {completed}/{total}
          </strong>

        </div>

        <div className="monthly-stats-progress-track">

          <div
            className="monthly-stats-progress-fill"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>


      {/* Footer */}
      <div
        className={`monthly-stats-footer ${
          percentage >= 100
            ? "monthly-stats-footer-complete"
            : ""
        }`}
      >

        <span>
          {percentage >= 100 ? "🏆" : "📅"}
        </span>

        <span>
          {percentage >= 100
            ? "Perfect monthly completion!"
            : "Keep building consistency throughout the month."}
        </span>

      </div>

    </section>
  );
}

export default MonthlyStats;