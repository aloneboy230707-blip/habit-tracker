import React from "react";

function WeeklyChallenge({ habits }) {

  const today = new Date();

  const day = today.getDay();

  const startOfWeek = new Date(today);

  startOfWeek.setDate(
    today.getDate() - day
  );

 const weekStartString = startOfWeek
  .toISOString()
  .split("T")[0];

const endOfWeek = new Date(startOfWeek);

endOfWeek.setDate(
  startOfWeek.getDate() + 6
);

const weekEndString = endOfWeek
  .toISOString()
  .split("T")[0];

let weeklyCompleted = 0;

habits.forEach((habit) => {

  (habit.completedDates || []).forEach((date) => {

    if (
      date >= weekStartString &&
      date <= weekEndString
    ) {
      weeklyCompleted++;
    }

  });

});

  const target = 20;

  const progress = Math.min(
    Math.round(
      (weeklyCompleted / target) * 100
    ),
    100
  );

  const remaining = Math.max(
    target - weeklyCompleted,
    0
  );

  const completed =
    weeklyCompleted >= target;

  return (

    <div className="weekly-challenge-card">

      {/* Header */}

      <div className="weekly-challenge-header">

        <div>

          <span className="weekly-challenge-eyebrow">
            WEEKLY CHALLENGE
          </span>

          <h2>
            🏆 Weekly Challenge
          </h2>

          <p>
            Build consistency by completing
            20 habits this week.
          </p>

        </div>

        <div
          className={`weekly-challenge-badge ${
            completed
              ? "challenge-completed"
              : ""
          }`}
        >
          {completed
            ? "🏆 Completed"
            : "🔥 Active"}
        </div>

      </div>


      {/* Main progress */}

      <div className="weekly-challenge-progress">

        <div className="weekly-progress-top">

          <div>

            <span>
              Weekly Progress
            </span>

            <strong>
              {weeklyCompleted} / {target}
            </strong>

          </div>

          <div className="weekly-progress-percent">
            {progress}%
          </div>

        </div>

        <div className="weekly-challenge-track">

          <div
            className="weekly-challenge-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>


      {/* Stats */}

      <div className="weekly-challenge-stats">

        <div className="weekly-challenge-stat">

          <div className="weekly-stat-icon">
            ✅
          </div>

          <div>
            <strong>
              {weeklyCompleted}
            </strong>

            <span>
              Completed
            </span>
          </div>

        </div>


        <div className="weekly-challenge-stat">

          <div className="weekly-stat-icon">
            ⏳
          </div>

          <div>
            <strong>
              {remaining}
            </strong>

            <span>
              Remaining
            </span>
          </div>

        </div>


        <div className="weekly-challenge-stat">

          <div className="weekly-stat-icon">
            ⭐
          </div>

          <div>
            <strong>
              +300
            </strong>

            <span>
              XP Reward
            </span>
          </div>

        </div>

      </div>


      {/* Footer */}

      <div
        className={`weekly-challenge-footer ${
          completed
            ? "weekly-footer-completed"
            : ""
        }`}
      >

        {completed ? (

          <>
            🏆 <strong>Weekly Champion!</strong>
            {" "}You completed the challenge.
          </>

        ) : remaining === 1 ? (

          <>
            🔥 Just <strong>1 habit</strong> left
            to complete this week's challenge!
          </>

        ) : (

          <>
            💪 Complete{" "}
            <strong>{remaining} more habits</strong>
            {" "}to earn +300 XP.
          </>

        )}

      </div>

    </div>

  );

}

export default WeeklyChallenge;