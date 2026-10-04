import React from "react";

function DailyGoalBox({
  dailyGoal,
  todayCompleted,
}) {

  const safeGoal = Math.max(
    0,
    Number(dailyGoal) || 0
  );

  const safeCompleted = Math.max(
    0,
    Number(todayCompleted) || 0
  );

  const remaining =
    Math.max(
      safeGoal - safeCompleted,
      0
    );

  const progress =
    safeGoal === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (safeCompleted / safeGoal) * 100
          )
        );

  return (

    <div
      className={
        `daily-goal-box ${
          progress >= 100
            ? "completed"
            : ""
        }`
      }
    >

      {/* HEADER */}

      <div className="daily-goal-header">

        <div>

          <h3>
            🎯 Daily Goal
          </h3>

          <p className="daily-goal-subtitle">
            Stay consistent and complete your habits today.
          </p>

        </div>

        <div className="daily-goal-percentage">
          {progress}%
        </div>

      </div>


      {/* PROGRESS */}

      <div className="daily-goal-progress">

        <div className="daily-goal-progress-top">

          <span>
            Today's progress
          </span>

          <strong>
            {safeCompleted} / {safeGoal}
          </strong>

        </div>


        <div className="daily-goal-track">

          <div
            className="daily-goal-fill"
            style={{
              width: `${progress}%`
            }}
          />

        </div>

      </div>


      {/* BOTTOM STATS */}

      <div className="daily-goal-stats">

        <div className="daily-goal-stat">

          <span className="daily-goal-stat-icon">
            🎯
          </span>

          <div>
            <strong>
              {safeGoal}
            </strong>

            <span>
              Daily Goal
            </span>
          </div>

        </div>


        <div className="daily-goal-stat">

          <span className="daily-goal-stat-icon completed-icon">
            ✅
          </span>

          <div>
            <strong>
              {safeCompleted}
            </strong>

            <span>
              Completed
            </span>
          </div>

        </div>


        <div className="daily-goal-stat">

          <span className="daily-goal-stat-icon remaining-icon">
            ⏳
          </span>

          <div>
            <strong>
              {remaining}
            </strong>

            <span>
              Remaining
            </span>
          </div>

        </div>

      </div>


      {/* COMPLETION MESSAGE */}

      <div className="daily-goal-message">

        {progress >= 100
          ? "🎉 Daily goal completed! Great work."
          : remaining === 1
          ? "🔥 Just one more habit to go!"
          : `${remaining} habits left to complete your goal.`
        }

      </div>

    </div>

  );
}

export default DailyGoalBox;