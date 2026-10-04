import React from "react";

function YearlyProgress({ habits }) {
  const currentYear = new Date().getFullYear();

  let totalCompleted = 0;
  let totalXP = 0;
  let bestStreak = 0;
  let currentStreak = 0;
  let missedDays = 0;

  let topHabit = "None";
  let topCount = 0;

  habits.forEach((habit) => {
    const completed = habit.completedDates || [];

    const yearlyCompleted = completed.filter(
      (date) => date.startsWith(currentYear.toString())
    );

    totalCompleted += yearlyCompleted.length;

    totalXP += habit.xp || 0;

    bestStreak = Math.max(
      bestStreak,
      habit.longestStreak || 0
    );

    currentStreak = Math.max(
      currentStreak,
      habit.streak || 0
    );

    missedDays += habit.missedDays || 0;

    if (yearlyCompleted.length > topCount) {
      topCount = yearlyCompleted.length;
      topHabit = habit.name;
    }
  });

  const totalPossible = habits.length * 365;

  const successRate =
    totalPossible === 0
      ? 0
      : (
          (totalCompleted / totalPossible) *
          100
        ).toFixed(0);

  const safeSuccessRate = Math.min(
    100,
    Math.max(0, Number(successRate))
  );

  return (
    <section className="premium-yearly-card">

      {/* HEADER */}
      <div className="yearly-header">

        <div className="yearly-title-area">

          <span className="yearly-eyebrow">
            YEARLY PERFORMANCE
          </span>

          <h2>
            📈 {currentYear} Summary
          </h2>

          <p>
            Track your consistency, achievements,
            streaks, and progress throughout the year.
          </p>

        </div>

        <div className="yearly-rate-badge">

          <div className="yearly-rate-icon">
            📊
          </div>

          <div>
            <strong>{safeSuccessRate}%</strong>

            <span>
              Success Rate
            </span>
          </div>

        </div>

      </div>


      {/* MAIN PROGRESS */}
      <div className="yearly-progress-section">

        <div className="yearly-progress-top">

          <div>
            <span>
              Yearly Consistency
            </span>

            <small>
              {totalCompleted.toLocaleString()} completed
              habit days
            </small>
          </div>

          <strong>
            {safeSuccessRate}%
          </strong>

        </div>

        <div className="yearly-progress-track">

          <div
            className="yearly-progress-fill"
            style={{
              width: `${safeSuccessRate}%`,
            }}
          />

        </div>

        <div className="yearly-progress-footer">

          <span>
            🌱 Keep building consistency
          </span>

          <span>
            {currentYear}
          </span>

        </div>

      </div>


      {/* STAT GRID */}
      <div className="yearly-stat-grid">

        <div className="yearly-stat-card">

          <div className="yearly-stat-icon">
            ✅
          </div>

          <div>
            <strong>
              {totalCompleted.toLocaleString()}
            </strong>

            <span>
              Habits Completed
            </span>
          </div>

        </div>


        <div className="yearly-stat-card">

          <div className="yearly-stat-icon">
            🔥
          </div>

          <div>
            <strong>
              {currentStreak}
            </strong>

            <span>
              Current Streak
            </span>
          </div>

        </div>


        <div className="yearly-stat-card">

          <div className="yearly-stat-icon">
            🏆
          </div>

          <div>
            <strong>
              {bestStreak}
            </strong>

            <span>
              Best Streak
            </span>
          </div>

        </div>


        <div className="yearly-stat-card">

          <div className="yearly-stat-icon">
            ⭐
          </div>

          <div>
            <strong>
              {totalXP.toLocaleString()}
            </strong>

            <span>
              XP Earned
            </span>
          </div>

        </div>


        <div className="yearly-stat-card top-habit-stat">

          <div className="yearly-stat-icon">
            🎯
          </div>

          <div className="yearly-stat-content">

            <strong title={topHabit}>
              {topHabit}
            </strong>

            <span>
              Top Habit
            </span>

          </div>

        </div>


        <div className="yearly-stat-card">

          <div className="yearly-stat-icon">
            ⏳
          </div>

          <div>
            <strong>
              {missedDays}
            </strong>

            <span>
              Days Missed
            </span>
          </div>

        </div>

      </div>


      {/* FOOTER */}
      <div className="yearly-insight">

        <span className="yearly-insight-icon">
          💡
        </span>

        <div>
          <strong>
            Yearly Insight
          </strong>

          <p>
            Every completed day adds to your long-term
            consistency. Keep showing up and building momentum.
          </p>
        </div>

      </div>

    </section>
  );
}

export default YearlyProgress;