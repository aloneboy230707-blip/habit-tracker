import React from "react";

function AIHabitCoachPage({
  habits,
  todayCompleted
}) {

  const totalHabits = habits.length;

 const completionRate =
  totalHabits === 0
    ? 0
    : Math.round(
        (todayCompleted / totalHabits) * 100
      );

const highestStreak =
  habits.reduce(
    (max, habit) =>
      Math.max(
        max,
        habit.longestStreak || 0
      ),
    0
  );

let aiScore = completionRate;

if (highestStreak >= 30) {
  aiScore += 10;
} else if (highestStreak >= 15) {
  aiScore += 5;
}

if (aiScore > 100) {
  aiScore = 100;
}
let aiStatus = "";
let aiColor = "";

if (aiScore >= 90) {
  aiStatus = "🔥 Excellent";
  aiColor = "#22c55e";
} else if (aiScore >= 75) {
  aiStatus = "💪 Very Good";
  aiColor = "#3b82f6";
} else if (aiScore >= 50) {
  aiStatus = "😊 Good";
  aiColor = "#f59e0b";
} else if (aiScore >= 25) {
  aiStatus = "⚠ Needs Improvement";
  aiColor = "#ef4444";
} else {
  aiStatus = "🚀 Start Today";
  aiColor = "#dc2626";
}

  let stars = "⭐";

  if (completionRate >= 90)
    stars = "⭐⭐⭐⭐⭐";
  else if (completionRate >= 75)
    stars = "⭐⭐⭐⭐";
  else if (completionRate >= 50)
    stars = "⭐⭐⭐";
  else if (completionRate >= 25)
    stars = "⭐⭐";
  else
    stars = "⭐";
  let motivation = "";

if (completionRate >= 90) {

  motivation =
    "🔥 Outstanding! You're building excellent habits.";

} else if (completionRate >= 75) {

  motivation =
    "💪 Great job! Keep pushing toward perfection.";

} else if (completionRate >= 50) {

  motivation =
    "😊 Nice progress! Finish a few more habits today.";

} else if (completionRate >= 25) {

  motivation =
    "🌱 Small progress is still progress. Keep going.";

} else {

  motivation =
    "🚀 Today is a fresh start. Complete your first habit!";

}
const suggestions = [];
const today =
  new Date()
    .toISOString()
    .split("T")[0];

const remainingHabits =
  habits.filter(
    habit =>
      !(habit.completedDates || [])
        .includes(today)
  );

const priorityHabits =
  [...remainingHabits]
    .sort((a, b) => {

      const difficultyOrder = {
        Hard: 3,
        Medium: 2,
        Easy: 1,
      };

      return (
        (difficultyOrder[b.difficulty] || 0) -
        (difficultyOrder[a.difficulty] || 0)
      );

    })
    .slice(0, 3);
    const focusHabit =
  priorityHabits.length > 0
    ? priorityHabits[0]
    : null;
    const easyCompleted =
  habits.filter(
    habit =>
      habit.difficulty === "Easy" &&
      (habit.completedDates || []).includes(today)
  ).length;

const hardRemaining =
  habits.filter(
    habit =>
      habit.difficulty === "Hard" &&
      !(habit.completedDates || []).includes(today)
  ).length;

const bestHabit =
  habits.reduce(
    (best, habit) =>
      (habit.longestStreak || 0) >
      (best.longestStreak || 0)
        ? habit
        : best,
    {}
  );

const insights = [];

if (easyCompleted >= 2) {
  insights.push(
    "✅ You consistently complete Easy habits."
  );
}

if (hardRemaining > 0) {
  insights.push(
    "⚠ Hard habits are being skipped today."
  );
}

if (highestStreak >= 7) {
  insights.push(
    "🔥 Your consistency is improving."
  );
}

if (
  bestHabit.longestStreak &&
  bestHabit.streak
) {

  const remaining =
    bestHabit.longestStreak -
    bestHabit.streak;

  if (
    remaining > 0 &&
    remaining <= 3
  ) {

    insights.push(
      `🎯 Only ${remaining} day(s) left to beat your best streak!`
    );

  }

}

if (insights.length === 0) {

  insights.push(
    "😊 Keep completing habits consistently to unlock deeper AI insights."
  );

}
const tomorrowGoal =
  Math.max(
    3,
    Math.ceil(totalHabits * 0.8)
  );

const firstPriority =
  priorityHabits.length > 0
    ? priorityHabits[0]
    : null;

const biggestChallenge =
  remainingHabits.find(
    habit => habit.difficulty === "Hard"
  );

let tomorrowAdvice = "";

if (biggestChallenge) {

  tomorrowAdvice =
    "💪 Complete your hardest habit first while your energy is highest.";

}
else if (remainingHabits.length > 0) {

  tomorrowAdvice =
    "🎯 Finish your remaining habits early to build momentum.";

}
else {

  tomorrowAdvice =
    "🎉 Amazing consistency! Keep following the same routine tomorrow.";

}

const completedToday =
  habits.filter(habit =>
    (habit.completedDates || [])
      .includes(today)
  );
  const todayDate = new Date();

const oneWeekAgo = new Date();
oneWeekAgo.setDate(todayDate.getDate() - 7);

const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(todayDate.getDate() - 14);

const thisWeekCompleted = habits.reduce(
  (count, habit) => {

    const completed =
      (habit.completedDates || []).filter(date => {

        const d = new Date(date);

        return d >= oneWeekAgo;

      });

    return count + completed.length;

  },
  0
);
const lastWeekCompleted = habits.reduce(
  (count, habit) => {

    const completed =
      (habit.completedDates || []).filter(date => {

        const d = new Date(date);

        return (
          d >= twoWeeksAgo &&
          d < oneWeekAgo
        );

      });

    return count + completed.length;

  },
  0
);
let weeklyAnalysis = "";

if (lastWeekCompleted === 0 && thisWeekCompleted > 0) {

  weeklyAnalysis =
    "🚀 Great start! You began building your habit consistency this week.";

}
else if (thisWeekCompleted > lastWeekCompleted) {

  const improvement =
    Math.round(
      ((thisWeekCompleted - lastWeekCompleted) /
      lastWeekCompleted) * 100
    );

  weeklyAnalysis =
    `🔥 Excellent! Your habit completion improved by ${improvement}% compared to last week.`;

}
else if (thisWeekCompleted < lastWeekCompleted) {

  const decrease =
    Math.round(
      ((lastWeekCompleted - thisWeekCompleted) /
      lastWeekCompleted) * 100
    );

  weeklyAnalysis =
    `⚠ Your completion dropped by ${decrease}% compared to last week. Try completing one extra habit daily.`;

}
else {

  weeklyAnalysis =
    "😊 Your performance is stable. Keep maintaining your consistency.";

}

const remainingToday =
  habits.filter(habit =>
    !(habit.completedDates || [])
      .includes(today)
  );
  

if (completedToday.length === 0) {

  suggestions.push(
    "🚀 You haven't completed any habit today. Start with the easiest one."
  );

}

if (remainingToday.length > 3) {

  suggestions.push(
    "📋 You still have several habits left today. Complete one now to build momentum."
  );

}

if (remainingToday.length === 0) {

  suggestions.push(
    "🎉 Excellent! You've completed every habit today."
  );

}

const difficultHabit =
  habits.find(
    habit =>
      habit.difficulty === "Hard"
  );

if (difficultHabit) {

  suggestions.push(
  `💪 Don't skip your difficult habit: ${difficultHabit.name}`
);

}

if (habits.length === 0) {

  suggestions.push(
    "➕ Add your first habit to begin tracking."
  );

}


  return (

    <div className="ai-page">

      <h1>🤖 AI Habit Coach</h1>
      <div className="ai-card">

  <h2>🧠 AI Daily Score</h2>

  <h1>{aiScore}/100</h1>

  <div className="score-bar">

    <div
      className="score-fill"
      style={{
        width: `${aiScore}%`,
        background: aiColor,
      }}
    ></div>

  </div>

  <h3 style={{ color: aiColor }}>
    {aiStatus}
  </h3>

</div>

      <div className="ai-card">
        <div className="ai-card">

  <h2>🔥 AI Motivation</h2>

  <p>{motivation}</p>

</div>
<div className="card">

<h2>
💡 AI Improvement Suggestions
</h2>
<div className="section">

<h2>
🎯 Today's Priority
</h2>

{
priorityHabits.length === 0 ?

(
<p>
All today's habits are completed 🎉
</p>
)

:

priorityHabits.map(habit => (

<div
key={habit.id}
className="priority-card"
>

<h3>
  {habit.name}
</h3>

<p>
Difficulty :
{habit.difficulty}
</p>

</div>

))

}

</div>

{suggestions.map(
  (tip, index) => (

    <p key={index}>
      {tip}
    </p>

  )
)}

</div>

        <h2>🧠 Today's Analysis</h2>
        <div className="ai-card">

  <h2>📈 AI Weekly Analysis</h2>

  <p>
    {weeklyAnalysis}
  </p>

</div>
<div className="ai-card">

  <h2>🎯 AI Focus Habit</h2>

  {
    focusHabit ? (

      <>
        <h3>{focusHabit.name}</h3>

        <p>
          Difficulty: {focusHabit.difficulty}
        </p>

        <p>
          💡 Complete this habit first to maintain your momentum today.
        </p>
      </>

    ) : (

      <p>
        🎉 All today's habits are completed.
      </p>

    )
  }

</div>
<div className="ai-card">

  <h2>🧠 AI Productivity Insights</h2>

  {insights.map(
    (item, index) => (

      <p key={index}>
        {item}
      </p>

    )
  )}

</div>
<div className="ai-card">

  <h2>🌅 AI Tomorrow Planner</h2>

  <p>
    <strong>🎯 Tomorrow's Goal:</strong>
    {" "}
    Complete at least {tomorrowGoal} habits.
  </p>

  <p>
    <strong>⭐ First Priority:</strong>
    {" "}
    {firstPriority
      ? firstPriority.name
      : "All habits completed"}
  </p>

  <p>
    <strong>🔥 Biggest Challenge:</strong>
    {" "}
    {biggestChallenge
      ? biggestChallenge.name
      : "No hard habits remaining"}
  </p>

  <p>

    <strong>🤖 AI Advice:</strong>

    <br />

    {tomorrowAdvice}

  </p>

</div>

        <p>
          <strong>Completed Today:</strong>{" "}
          {todayCompleted} / {totalHabits}
        </p>

        <p>
          <strong>Completion Rate:</strong>{" "}
          {completionRate}%
        </p>

        <p>
          <strong>Current Best Streak:</strong>{" "}
          {highestStreak} Days
        </p>
        <p>
  <strong>This Week Completed:</strong>{" "}
  {thisWeekCompleted}
</p>
<p>
  <strong>Last Week Completed:</strong>{" "}
  {lastWeekCompleted}
</p>

        <p>
          <strong>Performance:</strong>{" "}
          {stars}
        </p>

      </div>

    </div>

  );

}

export default AIHabitCoachPage;