function YearlyProgress({ habits }) {

  const currentYear =
    new Date().getFullYear();

  let totalCompleted = 0;

  let totalXP = 0;

  let bestStreak = 0;

  let currentStreak = 0;

  let missedDays = 0;

  let topHabit = "None";

  let topCount = 0;

  habits.forEach((habit) => {

    const completed =
      habit.completedDates || [];

    const yearlyCompleted =
      completed.filter(
        (date) =>
          date.startsWith(
            currentYear.toString()
          )
      );

    totalCompleted +=
      yearlyCompleted.length;

    totalXP += habit.xp || 0;

    bestStreak = Math.max(
      bestStreak,
      habit.longestStreak || 0
    );

    currentStreak = Math.max(
      currentStreak,
      habit.streak || 0
    );

    missedDays +=
      habit.missedDays || 0;

    if (
      yearlyCompleted.length >
      topCount
    ) {

      topCount =
        yearlyCompleted.length;

      topHabit =
        habit.name;

    }

  });

  const totalPossible =
    habits.length * 365;

  const successRate =
    totalPossible === 0
      ? 0
      : (
          (totalCompleted /
            totalPossible) *
          100
        ).toFixed(0);

  return (

    <div className="yearly-dashboard">

      <h2>
        📈 {currentYear} Summary
      </h2>

      <div className="year-card">
        Habits Completed:
        {totalCompleted}
      </div>

      <div className="year-card">
        Current Streak:
        {currentStreak}
      </div>

      <div className="year-card">
        Best Streak:
        {bestStreak}
      </div>

      <div className="year-card">
        XP Earned:
        {totalXP}
      </div>

      <div className="year-card">
        Success Rate:
        {successRate}%
      </div>

      <div className="year-card">
        Top Habit:
        {topHabit}
      </div>

      <div className="year-card">
        Days Missed:
        {missedDays}
      </div>

    </div>

  );

}

export default YearlyProgress;

