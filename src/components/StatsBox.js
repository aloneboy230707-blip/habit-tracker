function StatsBox({
  weeklyCompleted,
  habits,
}) {
  const totalHabits =
    habits.length;

  const completedToday =
    habits.filter((habit) =>
      (
        habit.completedDates || []
      ).includes(
        new Date()
          .toISOString()
          .split("T")[0]
      )
    ).length;

  const completionPercentage =
    totalHabits === 0
      ? 0
      : Math.round(
          (completedToday /
            totalHabits) *
            100
        );

  return (
    <div className="stats-box">
      <h3>📊 Weekly Stats</h3>

      <p>
        Weekly Completions:
        <strong>
          {" "}
          {weeklyCompleted}
        </strong>
      </p>

      <p>
        Completion Rate:
        <strong>
          {" "}
          {completionPercentage}%
        </strong>
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width:
              `${completionPercentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default StatsBox;