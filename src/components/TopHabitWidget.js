import React from "react";

function TopHabitWidget({ habits }) {

  const leaderboard = [...habits]
    .sort((a, b) => (b.xp || 0) - (a.xp || 0))
    .slice(0, 5);

  return (

    <div className="leaderboard-card">

      <h2>🏆 Habit Leaderboard</h2>

      {leaderboard.length === 0 ? (

        <p>No habits yet</p>

      ) : (

        leaderboard.map((habit, index) => (

          <div
            key={habit.id}
            className="leaderboard-row"
          >

            <span>
              {index + 1}.
            </span>

            <span>
              {habit.name}
            </span>

            <span>
              ⭐ {habit.xp || 0} XP
            </span>

          </div>

        ))

      )}

    </div>

  );

}

export default TopHabitWidget;