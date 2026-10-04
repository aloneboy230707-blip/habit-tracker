import React from "react";

function UserProfile({
  user,
  habits,
  totalXP,
  level,
  theme,
  setTheme
}) {
  const safeTotalXP = Number(totalXP) || 0;
const safeLevel = Number(level) || 1;
  const totalHabits = habits.length;

  const totalCompleted = habits.reduce(
    (sum, habit) =>
      sum + (habit.completedDates?.length || 0),
    0
  );

  const bestStreak = Math.max(
    ...habits.map(
      (habit) => habit.longestStreak || 0
    ),
    0
  );


  const currentLevelXP =
    totalXP % 100;

  const levelProgress =
    totalXP === 0
      ? 0
      : currentLevelXP;

  let badge = "🌱 Beginner";

  if (bestStreak >= 100) {
    badge = "👑 Legend";
  } else if (bestStreak >= 50) {
    badge = "🏆 Master";
  } else if (bestStreak >= 30) {
    badge = "🥇 Champion";
  } else if (bestStreak >= 14) {
    badge = "⚔️ Warrior";
  } else if (bestStreak >= 7) {
    badge = "🔥 Consistent";
  }

  const averageProgress =
    totalHabits > 0
      ? Math.round(
          habits.reduce((sum, habit) => {

            const completed =
              habit.completedDates?.length || 0;

            const created =
              habit.createdAt
                ? Math.max(
                    1,
                    Math.floor(
                      (new Date() -
                        new Date(habit.createdAt)) /
                        (1000 * 60 * 60 * 24)
                    ) + 1
                  )
                : 1;

            const habitProgress =
              Math.min(
                100,
                (completed / created) * 100
              );

            return sum + habitProgress;

          }, 0) / totalHabits
        )
      : 0;

  return (
    <div className="profile-card premium-profile-card">

      {/* PROFILE HEADER */}

      <div className="profile-header">

        <div className="profile-avatar">
          👤
        </div>

        <div className="profile-identity">

          <h2>
            {user?.displayName || "HabitFlow User"}
          </h2>

          <p>
            Building better habits, one day at a time.
          </p>

        </div>

        <div className="profile-badge">
          {badge}
        </div>

      </div>


      {/* XP SECTION */}

      <div className="profile-xp-section">

        <div className="profile-xp-top">

          <div>
            <span className="profile-section-label">
              LEVEL
            </span>

            <strong>
              {level}
            </strong>
          </div>

          <div className="profile-xp-value">
            ⭐ {safeTotalXP.toLocaleString()} XP
          </div>

        </div>

        <div className="profile-progress-track">

          <div
            className="profile-progress-fill"
            style={{
              width: `${levelProgress}%`
            }}
          />

        </div>

        <div className="profile-progress-text">

          <span>
            {levelProgress}% to next level
          </span>

          <span>
            {100 - levelProgress} XP remaining
          </span>

        </div>

      </div>


      {/* QUICK STATS */}

      <div className="profile-stat-grid">

        <div className="profile-stat">

          <div className="profile-stat-icon">
            🔥
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


        <div className="profile-stat">

          <div className="profile-stat-icon">
            ✅
          </div>

          <div>
            <strong>
              {totalCompleted}
            </strong>

            <span>
              Completions
            </span>
          </div>

        </div>


        <div className="profile-stat">

          <div className="profile-stat-icon">
            📅
          </div>

          <div>
            <strong>
              {totalHabits}
            </strong>

            <span>
              Total Habits
            </span>
          </div>

        </div>


        <div className="profile-stat">

          <div className="profile-stat-icon">
            📈
          </div>

          <div>
            <strong>
              {averageProgress}%
            </strong>

            <span>
              Avg. Progress
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default UserProfile;