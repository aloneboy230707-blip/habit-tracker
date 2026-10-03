import React from "react";


function UserProfile({
  user,
  habits,
  theme,
  setTheme
}) {

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

const totalXP = habits.reduce(
  (sum, habit) =>
    sum + (habit.xp || 0),
  0
);

const level =
  Math.floor(totalXP / 100) + 1;

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

            return sum + (completed / created) * 100;
          }, 0) / totalHabits
        )
      : 0;

  return (
  <div className="profile-card">

    <h2>
      👤 {user?.displayName}
    </h2>

    <p>
      🏆 Badge: {badge}
    </p>
    <p>
  ⭐ Total XP: {totalXP}
</p>

<p>
  🎖️ Level: {level}
</p>

    <p>
      📅 Total Habits: {totalHabits}
    </p>

    <p>
      🔥 Best Streak: {bestStreak}
    </p>
    <p>
      ✅ Total Completions: {totalCompleted}
    </p>
    
    <p>
      📈 Average Progress: {averageProgress}%
    </p>

  </div>
);
}

export default UserProfile;