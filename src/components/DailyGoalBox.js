import React from "react";

function DailyGoalBox({
  dailyGoal,
  todayCompleted,
}) {

  return (

    <div className="daily-goal-box">

      <h3>
        🎯 Daily Goal
      </h3>

      <p>
        Goal: {dailyGoal}
      </p>

      <p>
        Completed Today:
        {" "}
        {todayCompleted}
      </p>

      <p>
        Remaining:
        {" "}
        {dailyGoal - todayCompleted > 0
          ? dailyGoal - todayCompleted
          : 0}
      </p>

    </div>

  );

}

export default DailyGoalBox;