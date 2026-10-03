
function SmartInsights({ habits, totalXP, level }) {

  if (!habits.length) return null;

  const insights = [];

  // Strongest Habit
  const strongestHabit = [...habits].sort(
    (a, b) => (b.streak || 0) - (a.streak || 0)
  )[0];

  if (strongestHabit) {
    insights.push(
      `🔥 ${strongestHabit.name} is your strongest habit`
    );
  }

  // XP to next level
  const xpNeeded =
    100 - (totalXP % 100);

  insights.push(
    `⭐ Only ${xpNeeded} XP away from Level ${level + 1}`
  );

  // Inactive habits
  habits.forEach((habit) => {

    const dates =
      habit.completedDates || [];

    if (!dates.length) return;

    const lastDate =
      new Date(dates[dates.length - 1]);

    const daysMissed =
      Math.floor(
        (new Date() - lastDate) /
        (1000 * 60 * 60 * 24)
      );

    if (daysMissed >= 4) {
      insights.push(
        `⚠️ ${habit.name} hasn't been completed in ${daysMissed} days`
      );
    }

  });

  return (

    <div className="smart-insights">

      <h2>🧠 Smart Insights</h2>

      {insights.map(
        (item, index) => (

          <div
            key={index}
            className="insight-card"
          >
            {item}
          </div>

        )
      )}

    </div>

  );

}

export default SmartInsights;

