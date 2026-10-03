function MonthlyStats({ habits }) {

  const currentMonth =
    new Date().getMonth();

  const currentYear =
    new Date().getFullYear();

  let completed = 0;

  let missed = 0;

  habits.forEach((habit) => {

    (habit.completedDates || []).forEach((date) => {

      const d = new Date(date);

      if (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      ) {
        completed++;
      }

    });

    missed += habit.missedDays || 0;

  });

  const total = completed + missed;

  const percentage =
    total === 0
      ? 0
      : ((completed / total) * 100).toFixed(1);

  const monthName =
    new Date().toLocaleString(
      "default",
      {
        month: "long",
      }
    );

  return (

    <div className="monthly-stats">

      <h2>
        📅 {monthName} {currentYear}
      </h2>

      <p>
        ✅ Completed:
        <strong> {completed}</strong>
      </p>

      <p>
        ❌ Missed:
        <strong> {missed}</strong>
      </p>

      <p>
        📈 Completion:
        <strong> {percentage}%</strong>
      </p>

    </div>

  );

}

export default MonthlyStats;