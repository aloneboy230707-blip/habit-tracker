import React from "react";

import UserProfile from "../components/UserProfile";
import DashboardStats from "../components/DashboardStats";
import XPCard from "../components/XPCard";
import DailyQuote from "../components/DailyQuote";
import StatsBox from "../components/StatsBox";
import MonthlyStats from "../components/MonthlyStats";
import OverallProgress from "../components/OverallProgress";
import YearlyProgress from "../components/YearlyProgress";
import SmartInsights from "../components/SmartInsights";
import TopHabitWidget from "../components/TopHabitWidget";
import DailyMission from "../components/DailyMission";
import WeeklyChallenge from "../components/WeeklyChallenge";
import MonthlyChallenge from "../components/MonthlyChallenge";
import DailyGoalBox from "../components/DailyGoalBox";
import CalendarSection from "../components/CalendarSection";
import WeeklyChart from "../components/WeeklyChart";
import MonthlyChart from "../components/MonthlyChart";
import StreakGraph from "../components/StreakGraph";
import HabitCalendar from "../components/HabitCalendar";
import AICoach from "../components/AICoach";
import AICoachChat from "../components/AICoachChat";
function DashboardPage({
  user,
  habits,
  weeklyCompleted,

  totalXP,
  level,
  progress,
  nextLevelXP,
  rank,

  aiSuggestions,
  addHabit,

  dailyGoal,
  todayCompleted,

  selectedDate,
  setSelectedDate,

  heatmapData,

  selectedHabit,
}) {
  const today = new Date()
  .toISOString()
  .split("T")[0];

const remainingHabits = habits.filter(
  habit =>
    !(habit.completedDates || [])
      .includes(today)
);

const completionPercentage =
  habits.length === 0
    ? 0
    : Math.round(
        ((habits.length - remainingHabits.length) /
          habits.length) *
          100
      );

return (
    <>
      <UserProfile
        user={user}
        habits={habits}
      />

      <DailyQuote />
      <DailyGoalBox
        dailyGoal={dailyGoal}
        todayCompleted={todayCompleted}
      />
      <CalendarSection
    selectedDate={selectedDate}
    setSelectedDate={setSelectedDate}
    habits={habits}
    heatmapData={heatmapData}
  />
  <WeeklyChart
    habits={habits}
  />
  <MonthlyChart
      habits={habits}
    />
    <StreakGraph habits={habits} />
    {selectedHabit && (

  <HabitCalendar
    habit={selectedHabit}
  />

)}
    
  

      <div className="dashboard-grid">

        <DashboardStats
          habits={habits}
        />
       <AICoach
  user={user}
  habits={habits}
/>
<AICoachChat
  habits={habits}
/>


        <XPCard
          totalXP={totalXP}
          level={level}
          progress={progress}
          nextLevelXP={nextLevelXP}
          rank={rank}
        />
        <div className="progress-card">

  <h3>Today's Progress</h3>

  <h1>{completionPercentage}%</h1>

  <progress
    value={completionPercentage}
    max="100"
  ></progress>

  <p>
    {todayCompleted}/{dailyGoal} Habits Completed
  </p>

</div>

      </div>

      <div className="section">

        <StatsBox
          weeklyCompleted={weeklyCompleted}
          habits={habits}
        />

        <MonthlyStats
          habits={habits}
        />

        <OverallProgress
          habits={habits}
        />

      </div>
      <div className="remaining-card">

  <h2>
    📋 Today's Remaining Habits
  </h2>

  {
    remainingHabits.length === 0 ? (

      <p>
        🎉 All habits completed!
      </p>

    ) : (

      <>
        <ul>

          {remainingHabits.map(habit => (

            <li key={habit.id}>

              ☐ {habit.name}

            </li>

          ))}

        </ul>

        <p>

          <strong>

            {remainingHabits.length}

          </strong>

          {" "}Habit(s) Remaining

        </p>

      </>

    )
  }

</div>
<div className="progress-card">

  <h2>📊 Today's Progress</h2>

  <h1>{completionPercentage}%</h1>

  <progress
    value={completionPercentage}
    max="100"
  />

  <p>

    {habits.length - remainingHabits.length}

    {" / "}

    {habits.length}

    {" "}Habits Completed

  </p>

</div>

      <div className="section">

        <YearlyProgress
          habits={habits}
        />

        <SmartInsights
          habits={habits}
          totalXP={totalXP}
          level={level}
        />

        <div className="section">

          <h2>🤖 AI Habit Suggestions</h2>

          {aiSuggestions.length === 0 ? (
            <p>Add more habits to get recommendations.</p>
          ) : (
            aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-card"
              >
                {suggestion}

                <button
                  onClick={() =>
                    addHabit(
                      suggestion,
                      "General",
                      "Easy",
                      ""
                    )
                  }
                >
                  ➕ Add
                </button>

              </div>
            ))
          )}

        </div>

        <TopHabitWidget habits={habits} />

        <DailyMission habits={habits} />

        <WeeklyChallenge habits={habits} />

        <MonthlyChallenge habits={habits} />

      </div>
    </>
  );
}

export default DashboardPage;