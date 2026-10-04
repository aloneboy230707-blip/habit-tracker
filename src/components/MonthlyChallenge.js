import React from "react";

function MonthlyChallenge({ habits }) {
  const today = new Date();

  const currentMonth =
  `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;

  let completed = 0;

  habits.forEach((habit) => {
    completed += (habit.completedDates || []).filter(
      (date) => date.startsWith(currentMonth)
    ).length;
  });

  const target = 30;

 const progress = Math.min(
  100,
  Math.round((completed / target) * 100)
);

  const remaining = Math.max(target - completed, 0);
  const isCompleted = completed >= target;

  return (
    <div className="monthly-challenge-card">
      {/* Header */}
      <div className="monthly-challenge-header">
        <div>
          <span className="monthly-challenge-eyebrow">
            MONTHLY CHALLENGE
          </span>

          <h2>🏆 Monthly Challenge</h2>

          <p>
            Complete 30 habits this month and unlock your reward.
          </p>
        </div>

        <div
          className={`monthly-challenge-badge ${
            isCompleted ? "completed" : ""
          }`}
        >
          {isCompleted ? "🏆 Completed" : "🔥 Active"}
        </div>
      </div>

      {/* Progress */}
      <div className="monthly-challenge-progress">
        <div className="monthly-challenge-progress-top">
          <span>Monthly Progress</span>

          <strong>
            {Math.round(progress)}%
          </strong>
        </div>

        <div className="monthly-challenge-bar">
          <div
            className="monthly-challenge-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="monthly-challenge-stats">
        <div className="monthly-challenge-stat">
          <span className="monthly-stat-icon">✅</span>

          <div>
            <small>Completed</small>
            <strong>{completed}</strong>
          </div>
        </div>

        <div className="monthly-challenge-stat">
          <span className="monthly-stat-icon">🎯</span>

          <div>
            <small>Target</small>
            <strong>{target}</strong>
          </div>
        </div>

        <div className="monthly-challenge-stat">
          <span className="monthly-stat-icon">⚡</span>

          <div>
            <small>Remaining</small>
            <strong>{remaining}</strong>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`monthly-challenge-footer ${
          isCompleted ? "completed" : ""
        }`}
      >
        {isCompleted ? (
          <>
            <span>🎉</span>
            <span>Monthly Champion Unlocked!</span>
          </>
        ) : (
          <>
            <span>🚀</span>
            <span>
              {remaining} completion{remaining !== 1 ? "s" : ""} left
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default MonthlyChallenge;