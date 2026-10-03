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
          (habit) => habit.streak || 0
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

  return (

    <div className="dashboard-stats">

      <div className="stat-card">
        📊
        <h3>{totalHabits}</h3>
        <p>Total Habits</p>
      </div>

      <div className="stat-card">
        ✅
        <h3>{completedToday}</h3>
        <p>Completed Today</p>
      </div>
      

      

      <div className="stat-card">
        🔥
        <h3>{bestStreak}</h3>
        <p>Best Streak</p>
      </div>

      <div className="stat-card">
        🏆
        <h3>{averageProgress}%</h3>
        <p>Average Progress</p>
      </div>

    </div>

  );

}

export default DashboardStats;