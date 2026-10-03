import React from "react";
function highestRate(categories) {

  let highest = 0;

  Object.values(categories).forEach((cat) => {

    const rate = Math.round(

      (cat.completed / cat.total) * 100

    );

    if (rate > highest)

      highest = rate;

  });

  return highest;

}

function AICoach({
  user,
  habits,
}) {

  const hour = new Date().getHours();

  let greeting = "Hello";
  let emoji = "🤖";

  if (hour < 12) {
    greeting = "Good Morning";
    emoji = "🌅";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
    emoji = "☀️";
  } else {
    greeting = "Good Evening";
    emoji = "🌇";
  }
  const today = new Date()
  .toISOString()
  .split("T")[0];

const remainingHabits = habits.filter(
  habit =>
    !(habit.completedDates || []).includes(today)
);
const totalHabits = habits.length;

const completedToday =
  totalHabits - remainingHabits.length;

const confidence =
  totalHabits === 0
    ? 100
    : Math.round(
        (completedToday / totalHabits) * 100
      );
      const categories = {};

habits.forEach((habit) => {

  const category = habit.category || "General";

  if (!categories[category]) {

    categories[category] = {
      total: 0,
      completed: 0,
    };

  }

  categories[category].total++;

  if (
    (habit.completedDates || [])
      .includes(today)
  ) {

    categories[category].completed++;

  }


});
let weakestCategory = "None";
let prediction = 0;

if (totalHabits === 0) {

  prediction = 100;

} else {

  prediction = Math.round(

    ((completedToday * 0.7) +

    ((highestRate(categories) / 100) * 30))

  );

}

if (prediction > 100)

prediction = 100;

let weakestRate = 100;

Object.entries(categories).forEach(
  ([name, data]) => {

    const rate = Math.round(

      (data.completed / data.total) * 100

    );

    if (rate < weakestRate) {

      weakestRate = rate;

      weakestCategory = name;

    }

  }
);


let advice = "";

if (remainingHabits.length === 0) {

  advice =
    "🎉 Excellent! You completed all your habits today.";

} else if (remainingHabits.length === 1) {

  advice =
    "💪 Only one habit left. Finish strong!";

} else if (remainingHabits.length <= 3) {

  advice =
    `📌 You have ${remainingHabits.length} habits remaining today.`;

} else {

  advice =
    "⚠️ You have several habits remaining. Start with the easiest one.";

}

  return (

    <div className="ai-coach-card">

      <div className="ai-avatar">
        🤖
      </div>

      <h2>AI Habit Coach</h2>

      <h3>
        {emoji} {greeting},{" "}
        {user?.displayName || "User"}!
      </h3>
      <p className="ai-advice">

{advice}

</p>
<div className="confidence-box">

<h4>
🤖 AI Confidence
</h4>

<div className="confidence-value">

{confidence}%

</div>

<p>

{confidence >= 90
? "Excellent 🎉"

: confidence >= 70
? "Great Progress 💪"

: confidence >= 50
? "Keep Going 🚀"

: "Needs Attention ⚠️"}

</p>

</div>
<div className="analysis-box">

<h4>

📊 AI Analysis

</h4>

<p>

<b>Weakest Category:</b>

{weakestCategory}

</p>

<p>

<b>Completion Rate:</b>

{weakestRate}%

</p>

<p>

💡 Focus on

<b> {weakestCategory}</b>

habits first today.

</p>

</div>
<div className="prediction-box">

<h4>

🔮 AI Prediction

</h4>

<h2>

{prediction}%

</h2>

<p>

{prediction >= 85

? "Excellent chance of completing all habits today."

: prediction >= 65

? "You're on track. Keep going!"

: prediction >= 40

? "You need to complete more habits soon."

: "Today's completion chance is low. Start now."}

</p>

<p>

Completed Today:

<b>

{completedToday}

</b>

/

<b>

{totalHabits}

</b>

</p>

</div>

    </div>

  );

}

export default AICoach;