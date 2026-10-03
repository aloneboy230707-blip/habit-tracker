import React, {
  useEffect,
  useState,
  useMemo,
} from "react";

function TomorrowPlannerPage({

  habits,

}) {
    const today = new Date().toISOString().split("T")[0];
    const [savedPlan, setSavedPlan] =
  useState(null);
    const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

const tomorrowDate =
  tomorrow.toISOString().split("T")[0];
    const completedToday = habits.filter((habit) =>
  (habit.completedDates || []).includes(today)
);

const missedToday = habits.filter(
  (habit) =>
    !(habit.completedDates || []).includes(today)
);
const tomorrowSchedule = useMemo(() => {

  const schedule = {
    morning: [],
    afternoon: [],
    evening: [],
    night: [],
  };

  missedToday.forEach((habit) => {

    const category =
      (habit.category || "").toLowerCase();

    if (
      category.includes("fitness") ||
      category.includes("health")
    ) {

      schedule.morning.push(habit);

    }

    else if (
      category.includes("study") ||
      category.includes("work")
    ) {

      schedule.afternoon.push(habit);

    }

    else if (
      category.includes("reading") ||
      category.includes("learning")
    ) {

      schedule.evening.push(habit);

    }

    else {

      schedule.night.push(habit);

    }

  });

  return schedule;

}, [missedToday]);
const optimizeSchedule = (schedule) => {

  const optimized = {

    morning: [...schedule.morning],

    afternoon: [...schedule.afternoon],

    evening: [...schedule.evening],

    night: [...schedule.night],

  };

  if (optimized.morning.length > 3) {

    optimized.evening.push(
      optimized.morning.pop()
    );

  }

  if (optimized.afternoon.length > 3) {

    optimized.night.push(
      optimized.afternoon.pop()
    );

  }

  if (optimized.evening.length > 3) {

    optimized.night.push(
      optimized.evening.pop()
    );

  }

  return optimized;

};
const optimizedSchedule = useMemo(() => {
  return optimizeSchedule(tomorrowSchedule);
}, [tomorrowSchedule]);
  useEffect(() => {

  const saved =
    localStorage.getItem("TomorrowPlan");

  if (saved) {

    const parsed = JSON.parse(saved);

    if (parsed.date === tomorrowDate) {

      setSavedPlan(parsed);

      return;

    }

  }

  const newPlan = {

    date: tomorrowDate,

    schedule: optimizedSchedule,

  };

  localStorage.setItem(

    "TomorrowPlan",

    JSON.stringify(newPlan)

  );

  setSavedPlan(newPlan);

}, [optimizedSchedule, tomorrowDate]);
const moveHabit = (
  habit,
  from,
  to
) => {

  const updated = {

    ...savedPlan.schedule,

  };

  updated[from] =
    updated[from].filter(
      h => h.name !== habit.name
    );

  updated[to] = [
    ...updated[to],
    habit,
  ];

  const newPlan = {

    ...savedPlan,

    schedule: updated,

  };

  setSavedPlan(newPlan);

  localStorage.setItem(

    "TomorrowPlan",

    JSON.stringify(newPlan)

  );

};
const getPriority = (habit) => {

  const difficulty =
    (habit.difficulty || "").toLowerCase();

  if (difficulty === "hard") {

    return {
      label: "🔴 HIGH",
      color: "#e53935",
    };

  }

  if (difficulty === "medium") {

    return {
      label: "🟡 MEDIUM",
      color: "#f9a825",
    };

  }

  return {
    label: "🟢 LOW",
    color: "#43a047",
  };

};
const getDuration = (habit) => {

  const category =
    (habit.category || "").toLowerCase();

  if (
    category.includes("fitness")
  ) {

    return "45 min";

  }

  if (
    category.includes("study")
  ) {

    return "90 min";

  }

  if (
    category.includes("reading")
  ) {

    return "30 min";

  }

  if (
    category.includes("health")
  ) {

    return "15 min";

  }

  return "20 min";

};
const getReason = (habit) => {

  const category =
    (habit.category || "").toLowerCase();

  if (
    category.includes("fitness")
  ) {

    return "Morning workouts improve consistency and boost your energy.";

  }

  if (
    category.includes("study")
  ) {

    return "Afternoon usually provides the longest focused study session.";

  }

  if (
    category.includes("reading")
  ) {

    return "Evening is a calm time that's ideal for reading.";

  }

  if (
    category.includes("health")
  ) {

    return "Health habits are easier to maintain early in the day.";

  }

  return "Scheduled based on your current habit pattern.";

};




  return (
    

<div className="tomorrow-planner-page">

<h1>

📅 AI Tomorrow Planner

</h1>

<p>

Your AI-generated schedule for tomorrow.

</p>

<div className="planner-card">

<h2>

🌅 Tomorrow Schedule

</h2>
<div className="analysis-card">

<h2>🤖 AI Analysis</h2>

<div className="analysis-grid">

<div>

<h3>✅ Completed Today</h3>

{

completedToday.length === 0 ?

<p>No completed habits.</p>

:

completedToday.map((habit,index)=>(

<p key={index}>

✅ {habit.name}

</p>

))

}

</div>

<div>

<h3>❌ Missed Today</h3>

{

missedToday.length === 0 ?

<p>No missed habits.</p>

:

missedToday.map((habit,index)=>(

<p key={index}>

❌ {habit.name}

</p>

))

}

</div>

</div>

</div>
<div className="planner-status">

{

savedPlan ?

(

<p>

💾 Tomorrow's AI Plan Saved Successfully

</p>

)

:

(

<p>

Generating AI Plan...

</p>

)

}

</div>
<h2>
🌅 Tomorrow Schedule
</h2>

<div className="planner-timeline">
  <div className="optimization-card">

<h2>⚡ AI Optimization</h2>

<p>

Your schedule has been automatically balanced to avoid overload and improve your chances of completing every habit.

</p>

</div>

<div className="timeline-section">

<h3>🌞 Morning</h3>

{
(savedPlan?.schedule?.morning || []).length === 0 ?

<p>No tasks</p>

:

(savedPlan?.schedule?.morning || []).map((habit,index)=>(

<div
key={index}
className="timeline-task"
>

<div
style={{
color:getPriority(habit).color,
fontWeight:"bold",
}}
>

{getPriority(habit).label}

</div>

<div>

🕖 {habit.name}

</div>

<div
className="task-duration"
>

⏱️ {getDuration(habit)}

</div>
<div className="task-reason">

🧠 {getReason(habit)}

</div>
<button
className="move-btn"
onClick={() =>
moveHabit(
habit,
"morning",
"evening"
)
}
>

➡ Move to Evening

</button>

</div>
))
}

</div>

<div className="timeline-section">

<h3>☀️ Afternoon</h3>

{
(savedPlan?.schedule?.afternoon|| []).length === 0?

<p>No tasks</p>

:

(savedPlan?.schedule?.afternoon || []).map((habit,index)=>(

<div
key={index}
className="timeline-task"
>

<div
style={{
color:getPriority(habit).color,
fontWeight:"bold",
}}
>

{getPriority(habit).label}

</div>

<div>

🕖 {habit.name}

</div>

<div
className="task-duration"
>

⏱️ {getDuration(habit)}

</div>
<div className="task-reason">

🧠 {getReason(habit)}

</div>

</div>

))
}

</div>

<div className="timeline-section">

<h3>🌇 Evening</h3>

{
(savedPlan?.schedule?.evening || []).length === 0 ?

<p>No tasks</p>

:

(savedPlan?.schedule?.evening || []).map((habit,index)=>(

<div
key={index}
className="timeline-task"
>

<div
style={{
color:getPriority(habit).color,
fontWeight:"bold",
}}
>

{getPriority(habit).label}

</div>

<div>

🕖 {habit.name}

</div>

<div
className="task-duration"
>

⏱️ {getDuration(habit)}

</div>
<div className="task-reason">

🧠 {getReason(habit)}

</div>

</div>

))
}

</div>

<div className="timeline-section">

<h3>🌙 Night</h3>

{
(savedPlan?.schedule?.night || []).length === 0 ?

<p>No tasks</p>

:

(savedPlan?.schedule?.night || []).map((habit,index)=>(

<div
key={index}
className="timeline-task"
>

<div
style={{
color:getPriority(habit).color,
fontWeight:"bold",
}}
>

{getPriority(habit).label}

</div>

<div>

🕖 {habit.name}

</div>

<div
className="task-duration"
>

⏱️ {getDuration(habit)}

</div>
<div className="task-reason">

🧠 {getReason(habit)}

</div>

</div>

))
}

</div>

</div>

</div>

</div>

);

}

export default TomorrowPlannerPage;