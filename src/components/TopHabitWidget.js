import React from "react";

function TopHabitWidget({ habits }) {
  const leaderboard = [...habits]
    .sort((a, b) => (b.xp || 0) - (a.xp || 0))
    .slice(0, 5);

  return (
    <div className="premium-leaderboard-card">
      {/* Header */}
      <div className="leaderboard-header">
        <div>
          <span className="leaderboard-eyebrow">
            HABIT PERFORMANCE
          </span>

          <h2>🏆 Habit Leaderboard</h2>

          <p>
            Your highest XP habits at a glance.
          </p>
        </div>

        <div className="leaderboard-header-badge">
          ⭐ Top 5
        </div>
      </div>

      {/* Empty State */}
      {leaderboard.length === 0 ? (
        <div className="leaderboard-empty">
          <div className="leaderboard-empty-icon">🌱</div>

          <strong>No habits yet</strong>

          <span>
            Add your first habit to start building your leaderboard.
          </span>
        </div>
      ) : (
        <div className="leaderboard-list">
          {leaderboard.map((habit, index) => {
            const rank = index + 1;
            const xp = habit.xp || 0;

            return (
              <div
                key={habit.id}
                className={`premium-leaderboard-row rank-${rank}`}
              >
                {/* Rank */}
                <div className="leaderboard-rank">
                  {rank === 1
                    ? "🥇"
                    : rank === 2
                    ? "🥈"
                    : rank === 3
                    ? "🥉"
                    : rank}
                </div>

                {/* Habit */}
                <div className="leaderboard-habit">
                  <div className="leaderboard-habit-icon">
                    {rank === 1
                      ? "🔥"
                      : rank === 2
                      ? "⚡"
                      : "✓"}
                  </div>

                  <div className="leaderboard-habit-info">
                    <strong>{habit.name}</strong>

                    <span>
                      {rank === 1
                        ? "Top performing habit"
                        : `Ranked #${rank}`}
                    </span>
                  </div>
                </div>

                {/* XP */}
                <div className="leaderboard-xp">
                  <strong>{xp}</strong>
                  <span>XP</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      {leaderboard.length > 0 && (
        <div className="leaderboard-footer">
          <span>🚀</span>

          <span>
            Keep completing your habits to climb the leaderboard.
          </span>
        </div>
      )}
    </div>
  );
}

export default TopHabitWidget;