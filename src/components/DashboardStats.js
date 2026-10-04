import React from "react";

function DashboardStats({ habits }) {

  const totalHabits = habits.length;

  const today =
    new Date().toISOString().split("T")[0];

  const completedToday = habits.filter(
    (habit) =>
      habit.completedDates?.includes(today)
  ).length;

const bestStreak = habits.length
  ? Math.max(
      ...habits.map(
        (habit) => habit.longestStreak || 0
      )
    )
  : 0;

  const averageProgress =
    habits.length > 0
      ? (
          habits.reduce((total, habit) => {

            const createdDate =
              habit.createdAt
                ? new Date(habit.createdAt)
                : new Date();

            const daysActive =
              Math.max(
                1,
                Math.floor(
                  (new Date() - createdDate) /
                    (1000 * 60 * 60 * 24)
                ) + 1
              );

            const completed =
              new Set(
                habit.completedDates || []
              ).size;

            return (
              total +
              Math.min(
                100,
                (completed / daysActive) * 100
              )
            );

          }, 0) / habits.length
        ).toFixed(0)
      : 0;

  const stats = [
    {
      icon: "📊",
      value: totalHabits,
      label: "Total Habits",
      type: "primary",
    },
    {
      icon: "✅",
      value: completedToday,
      label: "Completed Today",
      type: "success",
    },
    {
      icon: "🔥",
      value: bestStreak,
      label: "Best Streak",
      type: "warning",
    },
    {
      icon: "🏆",
      value: `${averageProgress}%`,
      label: "Average Progress",
      type: "info",
    },
  ];

  return (

    <div className="dashboard-stats">

      {stats.map((stat) => (

        <div
          className={`stat-card stat-${stat.type}`}
          key={stat.label}
        >

          <div className="stat-card-top">

            <div className="stat-icon">
              {stat.icon}
            </div>

            <span className="stat-label">
              {stat.label}
            </span>

          </div>

          <div className="stat-value">
            {stat.value}
          </div>

          <div className="stat-footer">
            <span className="stat-status-dot" />
            Tracking your progress
          </div>

        </div>

      ))}

    </div>

  );
}

export default DashboardStats;