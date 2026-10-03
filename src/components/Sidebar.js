import React from "react";
import "./Sidebar.css";

function Sidebar({
  activePage,
  setActivePage,
}) {

  return (

    <div className="sidebar-menu">

      <h2>🚀 Habit Tracker</h2>

      <button
  className={
    activePage === "dashboard"
      ? "active"
      : ""
  }
  onClick={() =>
    setActivePage("dashboard")
  }
>
  📊 Dashboard
</button>

     <button
  className={
    activePage === "habits"
      ? "active"
      : ""
  }
  onClick={() =>
    setActivePage("habits")
  }
>
  ✅ Habits
</button>

      <button
  className={
    activePage === "analytics"
      ? "active"
      : ""
  }
  onClick={() =>
    setActivePage("analytics")
  }
>
  📈 Analytics
</button>

     <button
  className={
    activePage === "achievements"
      ? "active"
      : ""
  }
  onClick={() =>
    setActivePage("achievements")
  }
>
  🏆 Achievements
</button>

     <button
  className={
    activePage === "themes"
      ? "active"
      : ""
  }
  onClick={() =>
    setActivePage("themes")
  }
>
  🎨 Themes
</button>
<button

className={
activePage==="profile"
? "active"
: ""
}

onClick={()=>
setActivePage("profile")
}

>

👤 Profile

</button>

<button
  className={
    activePage === "settings"
      ? "active"
      : ""
  }
  onClick={() =>
    setActivePage("settings")
  }
>
  ⚙️ Settings
</button>
<button
  className={
    activePage === "weeklyReport"
      ? "active"
      : ""
  }
  onClick={() =>
    setActivePage("weeklyReport")
  }
>
  📊 Weekly Report
</button>
<button

onClick={() =>

setActivePage("planner")

}

>

📅 Tomorrow Planner

</button>
<button
  className={activePage === "goal-generator" ? "active" : ""}
  onClick={() => setActivePage("goal-generator")}
>
  🎯 Goal Generator
</button>
<button
  className={
    activePage === "coach"
      ? "active"
      : ""
  }
  onClick={() =>
    setActivePage("coach")
  }
>

🤖 AI Coach

</button>


    </div>

  );

}

export default Sidebar;