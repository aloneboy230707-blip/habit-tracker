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
  // =========================================================
  // TODAY
  // =========================================================

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // =========================================================
  // TODAY'S HABIT COMPLETION
  // =========================================================

  const completedToday = habits.filter(
    (habit) =>
      (habit.completedDates || []).includes(today)
  ).length;

  const totalHabits = habits.length;

  const completionPercentage =
    totalHabits === 0
      ? 0
      : Math.round(
          (completedToday / totalHabits) * 100
        );

  // =========================================================
  // TODAY'S REMAINING HABITS
  // =========================================================

  const remainingHabits = habits.filter(
    (habit) =>
      !(habit.completedDates || []).includes(today)
  );

  // =========================================================
  // SAFE DAILY GOAL
  // =========================================================

  const safeDailyGoal = Number(dailyGoal) || 0;

  const dailyGoalPercentage =
    safeDailyGoal === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (todayCompleted / safeDailyGoal) * 100
          )
        );

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      {/* =====================================================
          PROFILE
      ===================================================== */}

      <UserProfile
        user={user}
        habits={habits}
        totalXP={totalXP}
        level={level}
      />

      {/* =====================================================
          DAILY QUOTE
      ===================================================== */}

      <DailyQuote />

      {/* =====================================================
          DAILY GOAL
      ===================================================== */}

      <DailyGoalBox
        dailyGoal={dailyGoal}
        todayCompleted={todayCompleted}
      />

      {/* =====================================================
          DASHBOARD STATS
      ===================================================== */}

      <DashboardStats
        habits={habits}
      />

      {/* =====================================================
          CALENDAR
      ===================================================== */}

      <CalendarSection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        habits={habits}
        heatmapData={heatmapData}
      />

      {/* =====================================================
          CHARTS
      ===================================================== */}

      <WeeklyChart
        habits={habits}
      />

      <MonthlyChart
        habits={habits}
      />

      <StreakGraph
        habits={habits}
      />

      {/* =====================================================
          SELECTED HABIT CALENDAR
      ===================================================== */}

      {selectedHabit && (
        <HabitCalendar
          habit={selectedHabit}
        />
      )}

      {/* =====================================================
          MAIN DASHBOARD GRID
      ===================================================== */}

      <div className="dashboard-grid">

        {/* AI COACH */}

        <AICoach
          user={user}
          habits={habits}
        />

        {/* AI COACH CHAT */}

        <AICoachChat
          habits={habits}
        />

        {/* XP CARD */}

        <XPCard
          totalXP={totalXP}
          level={level}
          progress={progress}
          nextLevelXP={nextLevelXP}
          rank={rank}
        />

        {/* TODAY'S PROGRESS */}

        <div className="progress-card">

          <h3>
            Today's Progress
          </h3>

          <h1>
            {completionPercentage}%
          </h1>

          <progress
            value={completionPercentage}
            max="100"
          ></progress>

          <p>
            {completedToday}/{totalHabits} Habits Completed
          </p>

        </div>

      </div>

      {/* =====================================================
          STATISTICS SECTION
      ===================================================== */}

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

     {/* =====================================================
    TODAY'S REMAINING HABITS
    ===================================================== */}

<div className="remaining-card premium-remaining-card">

  <div className="remaining-header">

    <div>
      <span className="remaining-eyebrow">
        TODAY'S ROUTINE
      </span>

      <h2>
        📋 Today's Remaining Habits
      </h2>

      <p>
        Complete these habits to finish today's routine.
      </p>
    </div>

    <div className="remaining-count-badge">
      {remainingHabits.length}
      <span>left</span>
    </div>

  </div>

  {remainingHabits.length === 0 ? (

    <div className="remaining-empty">

      <div className="remaining-empty-icon">
        🎉
      </div>

      <div>
        <strong>
          All habits completed!
        </strong>

        <p>
          Excellent work. You've completed today's routine.
        </p>
      </div>

    </div>

  ) : (

    <>

      <div className="remaining-list">

        {remainingHabits.map((habit, index) => (

          <div
            key={habit.id}
            className="remaining-habit-item"
          >

            <div className="remaining-habit-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="remaining-habit-checkbox">
              ☐
            </div>

            <div className="remaining-habit-info">

              <strong>
                {habit.name}
              </strong>

              <span>
                {habit.category || "General"}
              </span>

            </div>

            <div className="remaining-habit-status">
              Pending
            </div>

          </div>

        ))}

      </div>

      <div className="remaining-footer">

        <span>🔥</span>

        <strong>
          {remainingHabits.length}
        </strong>

        <span>
          habit{remainingHabits.length !== 1 ? "s" : ""} remaining today
        </span>

      </div>

    </>

  )}

</div>

      {/* =====================================================
          INSIGHTS + CHALLENGES
      ===================================================== */}

      <div className="section">

        <YearlyProgress
          habits={habits}
        />

        <SmartInsights
          habits={habits}
          totalXP={totalXP}
          level={level}
        />

        {/* ===================================================
            AI HABIT SUGGESTIONS
        =================================================== */}

        <div className="premium-ai-suggestions">

          <div className="ai-suggestion-header">

            <div className="ai-suggestion-title-area">

              <span className="ai-suggestion-eyebrow">
                AI POWERED RECOMMENDATIONS
              </span>

              <h2>
                🤖 AI Habit Suggestions
              </h2>

              <p>
                Personalized habit ideas designed to help
                you build a stronger daily routine.
              </p>

            </div>

            <div className="ai-suggestion-badge">

              <span className="ai-suggestion-badge-dot"></span>

              ✨ Smart Ideas

            </div>

          </div>

          {aiSuggestions.length === 0 ? (

            <div className="suggestion-empty">

              <div className="suggestion-empty-icon">
                🤖
              </div>

              <div>

                <strong>
                  Your AI recommendations are preparing
                </strong>

                <p>
                  Add more habits to receive personalized
                  suggestions based on your routine.
                </p>

              </div>

            </div>

          ) : (

            <div className="suggestion-list">

              {aiSuggestions.map(
                (suggestion, index) => (

                  <div
                    key={index}
                    className="suggestion-card"
                  >

                    <div className="suggestion-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="suggestion-icon">
                      💡
                    </div>

                    <div className="suggestion-content">

                      <span className="suggestion-label">
                        AI RECOMMENDATION
                      </span>

                      <span className="suggestion-text">
                        {suggestion}
                      </span>

                    </div>

                    <button
                      className="suggestion-add-button"
                      onClick={() =>
                        addHabit(
                          suggestion,
                          "General",
                          "Easy",
                          ""
                        )
                      }
                    >

                      <span>
                        ＋
                      </span>

                      Add Habit

                    </button>

                  </div>

                )
              )}

            </div>

          )}

          {aiSuggestions.length > 0 && (

            <div className="ai-suggestion-footer">

              <div className="ai-footer-icon">
                ✨
              </div>

              <div>

                <strong>
                  Small habits. Better days.
                </strong>

                <p>
                  Choose an idea that fits naturally into
                  your routine and start building consistency.
                </p>

              </div>

            </div>

          )}

        </div>

        {/* =================================================
            TOP HABIT
        ================================================= */}

        <TopHabitWidget
          habits={habits}
        />

        {/* =================================================
            DAILY MISSION
        ================================================= */}

        <DailyMission
          habits={habits}
        />

        {/* =================================================
            WEEKLY CHALLENGE
        ================================================= */}

        <WeeklyChallenge
          habits={habits}
        />

        {/* =================================================
            MONTHLY CHALLENGE
        ================================================= */}

        <MonthlyChallenge
          habits={habits}
        />

      </div>
    </>
  );
}

export default DashboardPage;