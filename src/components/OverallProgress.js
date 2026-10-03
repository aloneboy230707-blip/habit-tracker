function OverallProgress({ habits }) {

  let totalCompleted = 0;

  habits.forEach((habit) => {
    totalCompleted +=
      habit.completedDates?.length || 0;
  });

  const totalPossible =
    habits.length * 30;

  const percentage =
    totalPossible === 0
      ? 0
      : (
          (totalCompleted /
            totalPossible) *
          100
        ).toFixed(1);

  return (
    <div className="overall-progress">

      <h2>
        📈 Overall Progress
      </h2>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        ></div>

      </div>

      <p>
        {percentage}% Completed
      </p>

      <p>
        {totalCompleted} / {totalPossible}
      </p>

    </div>
  );

}

export default OverallProgress;