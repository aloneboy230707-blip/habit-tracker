import React from "react";

function GoalGeneratorPage() {
   const goals = [

{
title: "Exercise Daily",
completed: false,
target: 30,
},

{
title: "Read 10 Books",
completed: true,
target: 100,
},

{
title: "Drink Water",
completed: false,
target: 20,
},

{
title: "Complete React Course",
completed: true,
target: 60,
},

];
const totalGoals = goals.length;

const completedGoals =
goals.filter(
goal => goal.completed
).length;

const activeGoals =
totalGoals - completedGoals;

const successRate =
totalGoals === 0
? 0
: Math.round(
(completedGoals /
totalGoals) * 100
);
const getDifficulty = (goal) => {

  if (goal.target >= 100) {

    return {
      label: "🔴 Hard",
      color: "#e53935",
    };

  }

  if (goal.target >= 30) {

    return {
      label: "🟡 Medium",
      color: "#f9a825",
    };

  }

  return {
    label: "🟢 Easy",
    color: "#43a047",
  };

};

  return (

    <div className="goal-generator-page">

<h1>

🎯 AI Goal Generator

</h1>

<p>

Let AI generate personalized goals based on your habits.

</p>

<div className="goal-stats">

<div className="goal-card">

<h2>{totalGoals}</h2>

<p>🎯 Total Goals</p>
<div className="goal-list">

{goals.map((goal, index) => (

<div
key={index}
className="goal-item"
>

<h3>{goal.title}</h3>

<p>
Status:
{goal.completed ? " ✅ Completed" : " ⏳ Active"}
</p>

<div
style={{
marginTop: "10px",
fontWeight: "bold",
color: getDifficulty(goal).color,
}}
>

Difficulty:
{getDifficulty(goal).label}

</div>

</div>

))}

</div>

</div>

<div className="goal-card">

<h2>{completedGoals}</h2>

<p>✅ Completed</p>

</div>

<div className="goal-card">

<h2>{activeGoals}</h2>

<p>🔥 Active</p>

</div>

<div className="goal-card">

<h2>{successRate}%</h2>

<p>⭐ Success</p>

</div>

</div>

</div>

  );

}

export default GoalGeneratorPage;