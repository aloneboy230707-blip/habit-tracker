import React from "react";

function DailyMission({ habits }) {

  const today = new Date()
    .toISOString()
    .split("T")[0];
    const completedToday = habits.filter(
  (habit) =>
    (habit.completedDates || []).includes(today)
).length;

const totalXP = habits.reduce(
  (sum, habit) => sum + (habit.xp || 0),
  0
);

  const streakMission = habits.some(
    (habit) => habit.streak >= 7
  );

  const readingMission = habits.some(
    (habit) =>
      habit.category === "Reading" &&
      habit.completedDates?.includes(today)
  );

  return (

    <div className="daily-mission-card">

      <h2>🎯 Today's Missions</h2>

     <p>
  {completedToday >= 3 ? "✅" : "⬜"}{" "}
  Complete 3 Habits ({completedToday}/3)
</p>

      <p>
  {totalXP >= 50 ? "✅" : "⬜"}{" "}
  Earn 50 XP ({Math.min(totalXP, 50)}/50)
</p>

      <p>
  {streakMission ? "✅" : "⬜"} Maintain 7+ Streak
</p>

<p>
  {readingMission ? "✅" : "⬜"} Complete Reading Habit
</p>

    </div>

  );

}

export default DailyMission;