import React from "react";

function WeeklyChallenge({ habits }) {

  const today = new Date();

  const day = today.getDay();

  const startOfWeek = new Date(today);

  startOfWeek.setDate(today.getDate() - day);

  const weekStart = startOfWeek
    .toISOString()
    .split("T")[0];

  let weeklyCompleted = 0;

  habits.forEach((habit) => {

    (habit.completedDates || []).forEach((date) => {

      if (date >= weekStart) {

        weeklyCompleted++;

      }

    });

  });

  const target = 20;

  const progress = Math.min(
    (weeklyCompleted / target) * 100,
    100
  );

  const completed =
    weeklyCompleted >= target;

  return (

    <div className="weekly-challenge-card">

      <h2>🔥 Weekly Challenge</h2>

      <p>Complete 20 habits this week</p>

      <div className="challenge-bar">

        <div
          className="challenge-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>

      </div>

      <p>

        {weeklyCompleted} / {target}

      </p>

      {completed ? (

        <h3>
          🏆 Weekly Champion
        </h3>

      ) : (

        <p>
          Reward: +300 XP
        </p>

      )}

    </div>

  );

}

export default WeeklyChallenge;