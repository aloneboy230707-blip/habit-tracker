function AnalyticsDashboard({
  habits,
}) {

  // TOTAL COMPLETIONS
  let totalCompletions = 0;

  habits.forEach((habit) => {

    totalCompletions +=
      (
        habit.completedDates
          ?.length || 0
      );

  });

  // STRONGEST HABIT
  let strongestHabit =
    "None";

  let highestStreak = 0;

  habits.forEach((habit) => {

    if (
      habit.streak >
      highestStreak
    ) {

      highestStreak =
        habit.streak;

      strongestHabit =
        habit.name;

    }

  });

  // WEAKEST HABIT
  let weakestHabit =
    "None";

  let lowestStreak =
    Infinity;

  habits.forEach((habit) => {

    if (
      habit.streak <
      lowestStreak
    ) {

      lowestStreak =
        habit.streak;

      weakestHabit =
        habit.name;

    }

  });

  // MONTHLY PROGRESS
  const monthlyProgress =
    habits.length === 0
      ? 0
      : (
          totalCompletions /
          (habits.length * 30)
        ) * 100;

  // STREAK LEADERBOARD
  const leaderboard =
    [...habits].sort(
      (a, b) =>
        b.streak - a.streak
    );

  return (

    <div className="analytics-dashboard">

      <h2>
        📊 Analytics Dashboard
      </h2>

      <div className="analytics-card">

        <h3>
          Weekly Completions
        </h3>

        <p>
          {totalCompletions}
        </p>

      </div>

      <div className="analytics-card">

        <h3>
          Strongest Habit
        </h3>

        <p>
          {strongestHabit}
        </p>

      </div>

      <div className="analytics-card">

        <h3>
          Weakest Habit
        </h3>

        <p>
          {weakestHabit}
        </p>

      </div>

      <div className="analytics-card">

        <h3>
          Monthly Progress
        </h3>

        <p>
          {monthlyProgress.toFixed(
            0
          )}%
        </p>

      </div>

      <div className="analytics-card">

        <h3>
          🏆 Streak Leaderboard
        </h3>

        {leaderboard.map(
          (habit, index) => (

            <p key={habit.id}>

              {index + 1}.
              {" "}
              {habit.name}
              {" "}
              —
              {" "}
              🔥
              {habit.streak}

            </p>

          )
        )}

      </div>

    </div>

  );

}

export default AnalyticsDashboard; 