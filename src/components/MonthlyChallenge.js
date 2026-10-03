function MonthlyChallenge({ habits }) {

  const today = new Date();

  const currentMonth =
    today.toISOString().slice(0, 7);

  let completed = 0;

  habits.forEach((habit) => {

    completed +=
      (habit.completedDates || []).filter(
        (date) =>
          date.startsWith(currentMonth)
      ).length;

  });

  const target = 30;

  const progress =
    Math.min(
      100,
      (completed / target) * 100
    );

  return (

    <div className="monthly-challenge-card">

      <h2>🏆 Monthly Challenge</h2>

      <div className="challenge-bar">

        <div
          className="challenge-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>

      </div>

      <h3>
        {completed} / {target}
      </h3>

      <p>

        {completed >= target
          ? "🎉 Monthly Champion Unlocked!"
          : `${target - completed} completions left`}

      </p>

    </div>

  );

}

export default MonthlyChallenge;