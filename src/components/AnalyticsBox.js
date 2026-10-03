function AnalyticsBox({
  habits,
}) {

  const totalHabits =
    habits.length;

  let totalCompletions = 0;

  let bestStreak = 0;

  let bestHabit = "";

  habits.forEach((habit) => {

    totalCompletions +=
      (
        habit.completedDates
          ?.length || 0
      );

    if (
      habit.streak >
      bestStreak
    ) {

      bestStreak =
        habit.streak;

      bestHabit =
        habit.name;

    }

  });

  const completionRate =
    totalHabits === 0
      ? 0
      : (
          totalCompletions /
          (totalHabits * 30)
        ) * 100;

  return (

    <div className="analytics-box">

      <h2>
        📊 Analytics
      </h2>

      <p>
        Total Habits:
        {totalHabits}
      </p>

      <p>
        Total Completions:
        {totalCompletions}
      </p>

      <p>
        Best Streak:
        {bestStreak}
      </p>

      <p>
        Most Consistent:
        {bestHabit || "None"}
      </p>

      <p>
        Completion Rate:
        {completionRate.toFixed(
          0
        )}%
      </p>

    </div>

  );

}

export default AnalyticsBox;