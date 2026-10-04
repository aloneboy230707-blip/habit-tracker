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
    (habit) => (habit.streak || 0) >= 7
  );

  const readingMission = habits.some(
    (habit) =>
      habit.category === "Reading" &&
      (habit.completedDates || []).includes(today)
  );

  const habitProgress = Math.min(
    completedToday,
    3
  );

  const xpProgress = Math.min(
    totalXP,
    50
  );

  const completedMissions = [
    completedToday >= 3,
    totalXP >= 50,
    streakMission,
    readingMission,
  ].filter(Boolean).length;

  const missionPercentage = Math.round(
    (completedMissions / 4) * 100
  );

  return (

    <div className="daily-mission-card">

      {/* Header */}

      <div className="daily-mission-header">

        <div>

          <span className="mission-eyebrow">
            DAILY CHALLENGE
          </span>

          <h2>
            🎯 Today's Missions
          </h2>

          <p>
            Complete these missions to keep your
            momentum going.
          </p>

        </div>

        <div className="mission-progress-badge">
          {completedMissions}/4
        </div>

      </div>


      {/* Overall progress */}

      <div className="mission-overall">

        <div className="mission-overall-top">

          <span>
            Today's mission progress
          </span>

          <strong>
            {missionPercentage}%
          </strong>

        </div>

        <div className="mission-progress-track">

          <div
            className="mission-progress-fill"
            style={{
              width: `${missionPercentage}%`,
            }}
          />

        </div>

      </div>


      {/* Mission 1 */}

      <div
        className={`mission-item ${
          completedToday >= 3
            ? "mission-completed"
            : ""
        }`}
      >

        <div className="mission-icon">
          {completedToday >= 3
            ? "✅"
            : "🎯"}
        </div>

        <div className="mission-content">

          <strong>
            Complete 3 Habits
          </strong>

          <span>
            {completedToday}/3 habits completed
          </span>

          <div className="mission-mini-track">

            <div
              className="mission-mini-fill"
              style={{
                width: `${
                  (habitProgress / 3) * 100
                }%`,
              }}
            />

          </div>

        </div>

        <div className="mission-status">

          {completedToday >= 3
            ? "Done"
            : `${completedToday}/3`}

        </div>

      </div>


      {/* Mission 2 */}

      <div
        className={`mission-item ${
          totalXP >= 50
            ? "mission-completed"
            : ""
        }`}
      >

        <div className="mission-icon">
          {totalXP >= 50
            ? "✅"
            : "⭐"}
        </div>

        <div className="mission-content">

          <strong>
            Earn 50 XP
          </strong>

          <span>
            {Math.min(totalXP, 50)}/50 XP earned
          </span>

          <div className="mission-mini-track">

            <div
              className="mission-mini-fill"
              style={{
                width: `${
                  (xpProgress / 50) * 100
                }%`,
              }}
            />

          </div>

        </div>

        <div className="mission-status">

          {totalXP >= 50
            ? "Done"
            : `${Math.min(totalXP, 50)}/50`}

        </div>

      </div>


      {/* Mission 3 */}

      <div
        className={`mission-item ${
          streakMission
            ? "mission-completed"
            : ""
        }`}
      >

        <div className="mission-icon">
          {streakMission
            ? "✅"
            : "🔥"}
        </div>

        <div className="mission-content">

          <strong>
            Maintain 7+ Streak
          </strong>

          <span>
            Keep at least one habit at a 7+ day streak.
          </span>

        </div>

        <div className="mission-status">

          {streakMission
            ? "Done"
            : "Pending"}

        </div>

      </div>


      {/* Mission 4 */}

      <div
        className={`mission-item ${
          readingMission
            ? "mission-completed"
            : ""
        }`}
      >

        <div className="mission-icon">
          {readingMission
            ? "✅"
            : "📚"}
        </div>

        <div className="mission-content">

          <strong>
            Complete Reading Habit
          </strong>

          <span>
            Finish at least one Reading habit today.
          </span>

        </div>

        <div className="mission-status">

          {readingMission
            ? "Done"
            : "Pending"}

        </div>

      </div>


      {/* Completion message */}

      <div className="mission-footer">

        {missionPercentage === 100
          ? "🏆 All daily missions completed! Amazing consistency."
          : missionPercentage >= 75
  ? "🔥 Almost there! Complete your final mission!"
  : missionPercentage >= 50
  ? "🔥 You're halfway there. Keep going!"
          : "💪 Start small and complete your first mission."}

      </div>

    </div>

  );
}

export default DailyMission;