import React from "react";
import {

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  CartesianGrid,

} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function WeeklyReportPage({

  user,

  habits,

  totalXP,

}) {
    const today = new Date();

const oneWeekAgo = new Date();
oneWeekAgo.setDate(today.getDate() - 6);

const weeklyCompleted = habits.reduce(
  (count, habit) => {

    const completed =
      (habit.completedDates || []).filter(date => {

        const completedDate = new Date(date);

        return completedDate >= oneWeekAgo;

      });

    return count + completed.length;

  },
  0
);

const totalHabits = habits.length;

const completionRate =
  totalHabits === 0
    ? 0
    : Math.round(
        (weeklyCompleted /
          (totalHabits * 7)) *
          100
      );

const longestStreak = Math.max(
  ...habits.map(
    habit => habit.longestStreak || 0
  ),
  0
);
const categoryStats = {};

habits.forEach((habit) => {

  const category = habit.category || "General";

  if (!categoryStats[category]) {

    categoryStats[category] = {

      completed: 0,

      total: 0,

    };

  }

  categoryStats[category].completed +=
    (habit.completedDates || []).length;

  categoryStats[category].total++;

});

let bestCategory = "None";

let weakestCategory = "None";

let highestAverage = -1;

let lowestAverage = Infinity;

Object.entries(categoryStats).forEach(
  ([category, stats]) => {

    const average =
      stats.completed / stats.total;

    if (average > highestAverage) {

      highestAverage = average;

      bestCategory = category;

    }

    if (average < lowestAverage) {

      lowestAverage = average;

      weakestCategory = category;

    }

  }
  
);
let weeklyGrade = "";

let weeklyMessage = "";

if (completionRate >= 90) {

  weeklyGrade = "⭐ A+";

  weeklyMessage =
    "Excellent! Keep it up!";

}

else if (completionRate >= 80) {

  weeklyGrade = "🥇 A";

  weeklyMessage =
    "Great Job!";

}

else if (completionRate >= 70) {

  weeklyGrade = "🥈 B";

  weeklyMessage =
    "Good Progress!";

}

else if (completionRate >= 60) {

  weeklyGrade = "🥉 C";

  weeklyMessage =
    "Needs Improvement.";

}

else {

  weeklyGrade = "❗ D";

  weeklyMessage =
    "Focus More Next Week.";

}
let bestHabit = "None";

let maxCompleted = -1;

habits.forEach((habit) => {

  const completed =
    (habit.completedDates || []).length;

  if (completed > maxCompleted) {

    maxCompleted = completed;

    bestHabit = habit.name;

  }

});
let weakestHabit = "None";

let minCompleted = Infinity;

habits.forEach((habit) => {

  const completed =
    (habit.completedDates || []).length;

  if (completed < minCompleted) {

    minCompleted = completed;

    weakestHabit = habit.name;

  }

});
const productivityScore =
  Math.min(
    100,
    Math.round(
      completionRate +
      longestStreak
    )
  );
  let aiTip = "";

if (completionRate >= 90) {

  aiTip =
    "Excellent consistency. Keep challenging yourself.";

}

else if (completionRate >= 75) {

  aiTip =
    "You're doing well. Focus on maintaining your streaks.";

}

else if (completionRate >= 50) {

  aiTip =
    `Try completing "${weakestHabit}" earlier in the day.`;

}

else {

  aiTip =
    "Start with one habit and complete it every day before adding more.";

}
const streakTrendData = habits.map((habit) => ({

  name: habit.name,

  streak: habit.currentStreak || 0,

}));
const weeklyXPEarned = habits.reduce((total, habit) => {

  const completedThisWeek =
    (habit.completedDates || []).filter((date) => {

      const completedDate = new Date(date);

      return completedDate >= oneWeekAgo;

    }).length;

  return total + completedThisWeek * 10;

}, 0);
let nextWeekGoal = "";

if (completionRate >= 90) {

  nextWeekGoal =
    "Maintain your excellent consistency.";

}

else if (completionRate >= 75) {

  nextWeekGoal =
    "Reach 90% completion next week.";

}

else if (completionRate >= 50) {

  nextWeekGoal =
    "Complete at least one extra habit every day.";

}

else {

  nextWeekGoal =
    "Build one habit before expanding.";

}
const exportWeeklyReport = () => {

  const doc = new jsPDF();

doc.setFillColor(33,150,243);

doc.rect(0,0,210,30,"F");

doc.setTextColor(255,255,255);

doc.setFontSize(22);

doc.text(
"Weekly Habit Report",
20,
20
);

doc.setTextColor(0,0,0);

doc.setFontSize(11);

doc.text(

`Generated on: ${new Date().toLocaleString()}`,

20,

40

);

doc.text(

`User: ${user?.displayName || "Guest"}`,

20,

48

);

doc.text(

`Email: ${user?.email || "Not Available"}`,

20,

56

);
autoTable(doc,{

startY:70,

head:[

["Statistic","Value"]

],

body:[

["Completion Rate",`${completionRate}%`],

["Weekly Grade",weeklyGrade],

["XP Earned",weeklyXPEarned],

["Best Habit",bestHabit],

["Longest Streak",`${longestStreak} Days`],

["Productivity",`${productivityScore}%`],

],

theme:"grid",

headStyles:{

fillColor:[33,150,243]

}

});
const finalY = doc.lastAutoTable.finalY + 15;

doc.setFontSize(16);

doc.text(

"AI Coach Recommendation",

20,

finalY

);

doc.setFontSize(12);

doc.text(

aiTip,

20,

finalY+10

);
doc.setFontSize(16);

doc.text(

"Next Week Goal",

20,

finalY+30

);

doc.setFontSize(12);

doc.text(

nextWeekGoal,

20,

finalY+40

);
doc.setFontSize(10);

doc.setTextColor(120);

doc.text(

"Generated by Habit Tracker Pro",

20,

285

);

doc.save("Weekly_Report.pdf");


};
  return (
    <div className="weekly-report-page">

      <div className="profile-stats">

  <div className="stat-card">
    <h2>{weeklyCompleted}</h2>
    <p>✅ Completed</p>
  </div>

  <div className="stat-card">
    <h2>{totalHabits}</h2>
    <p>📋 Total Habits</p>
  </div>

  <div className="stat-card">
    <h2>{completionRate}%</h2>
    <p>📈 Completion Rate</p>
  </div>

  <div className="stat-card">
    <h2>{totalXP}</h2>
    <p>💎 XP</p>
  </div>

  <div className="stat-card">
    <h2>{longestStreak}</h2>
    <p>🔥 Longest Streak</p>
  </div>

</div>

      <p>This feature is under development.</p>
      <div className="stat-card">

  <h2>{bestCategory}</h2>

  <p>🏆 Best Category</p>

</div>

<div className="stat-card">

  <h2>{weakestCategory}</h2>

  <p>📉 Needs Improvement</p>

</div>
<div className="stat-card">

  <h2>{weeklyGrade}</h2>

  <p>🏅 Weekly Grade</p>

</div>
<div className="weekly-feedback">

  <h2>

    📋 Weekly Feedback

  </h2>

  <p>

    {weeklyMessage}

  </p>

</div>
<div className="insight-grid">

  <div className="insight-card">

    <h3>🚀 Best Habit</h3>

    <h2>{bestHabit}</h2>

  </div>

  <div className="insight-card">

    <h3>⚠️ Needs Attention</h3>

    <h2>{weakestHabit}</h2>

  </div>

  <div className="insight-card">

    <h3>🔥 Productivity</h3>

    <h2>{productivityScore}%</h2>

  </div>

  <div className="insight-card">

    <h3>💡 AI Tip</h3>

    <p>{aiTip}</p>

  </div>

</div>
<div className="chart-card">

<h2>

🔥 Streak Trend

</h2>

<ResponsiveContainer
width="100%"
height={300}
>

<LineChart
data={streakTrendData}
>

<CartesianGrid
strokeDasharray="3 3"
/>

<XAxis
dataKey="name"
/>

<YAxis />

<Tooltip />

<Line

type="monotone"

dataKey="streak"

stroke="#4CAF50"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

</div>
<div className="summary-card">

  <h2>📋 Weekly Summary</h2>

  <div className="summary-grid">

    <div>

      <h3>💎 XP Earned</h3>

      <p>+{weeklyXPEarned} XP</p>

    </div>

    <div>

      <h3>🔥 Best Habit</h3>

      <p>{bestHabit}</p>

    </div>

    <div>

      <h3>🏆 Longest Streak</h3>

      <p>{longestStreak} Days</p>

    </div>

    <div>

      <h3>📈 Completion Rate</h3>

      <p>{completionRate}%</p>

    </div>

    <div>

      <h3>⭐ Weekly Grade</h3>

      <p>{weeklyGrade}</p>

    </div>

    <div>

      <h3>🎯 Next Week Goal</h3>

      <p>{nextWeekGoal}</p>

    </div>

  </div>

</div>
<div className="export-section">

  <button
    className="export-btn"
    onClick={exportWeeklyReport}
  >

    📄 Export Weekly Report

  </button>

</div>

    </div>
  );
}

export default WeeklyReportPage;