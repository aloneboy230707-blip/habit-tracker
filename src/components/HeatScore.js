function HeatScore({ habits }) {

  return (

    <div className="heat-score-card">

      <h2>🔥 Habit Heat Score</h2>

      {habits.map((habit) => {

        const completed =
          habit.completedDates?.length || 0;

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

        const score = Math.min(
          100,
          Math.round(
            (completed / daysActive) * 100
          )
        );

        return (

          <div
            key={habit.id}
            className="heat-row"
          >

            <p>
              {habit.name}
            </p>

            <div className="heat-bar">

              <div
                className="heat-fill"
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

            <span>
              {score}%
            </span>

          </div>

        );

      })}

    </div>

  );

}

export default HeatScore;