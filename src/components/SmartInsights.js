import React from "react";

function SmartInsights({ habits, totalXP, level }) {
  if (!habits.length) return null;

  const insights = [];

  // Strongest Habit
  const strongestHabit = [...habits].sort(
    (a, b) =>
      (b.streak || 0) -
      (a.streak || 0)
  )[0];

  if (strongestHabit) {
    insights.push({
      type: "success",
      icon: "🔥",
      title: "Strongest Habit",
      message: `${strongestHabit.name} is your strongest habit`,
    });
  }

  // XP to next level
  const xpNeeded =
    100 - (totalXP % 100);

  insights.push({
    type: "xp",
    icon: "⭐",
    title: "Level Progress",
    message: `Only ${xpNeeded} XP away from Level ${
      level + 1
    }`,
  });

  // Inactive habits
  habits.forEach((habit) => {
    const dates =
      habit.completedDates || [];

    if (!dates.length) return;

    const lastDate =
      new Date(
        dates[dates.length - 1]
      );

    const daysMissed =
      Math.floor(
        (new Date() - lastDate) /
          (1000 * 60 * 60 * 24)
      );

    if (daysMissed >= 4) {
      insights.push({
        type: "warning",
        icon: "⚠️",
        title: "Needs Attention",
        message: `${habit.name} hasn't been completed in ${daysMissed} days`,
      });
    }
  });

  return (
    <section className="premium-smart-insights">

      {/* Header */}
      <div className="smart-insights-header">

        <div className="smart-insights-title-area">

          <span className="smart-insights-eyebrow">
            PERSONALIZED ANALYSIS
          </span>

          <h2>
            🧠 Smart Insights
          </h2>

          <p>
            Useful observations based on your
            current habit activity.
          </p>

        </div>

        <div className="smart-insights-status">
          <span className="smart-insights-status-dot"></span>
          Live
        </div>

      </div>


      {/* Insights */}
      <div className="insights-grid">

        {insights.map((insight, index) => (
          <div
            key={index}
            className={`insight-card premium-insight-card ${insight.type}`}
          >

            <div className="insight-icon">
              {insight.icon}
            </div>

            <div className="insight-content">

              <span className="insight-title">
                {insight.title}
              </span>

              <p>
                {insight.message}
              </p>

            </div>

          </div>
        ))}

      </div>


      {/* Footer */}
      <div className="smart-insights-footer">

        <span className="smart-insights-footer-icon">
          ✨
        </span>

        <div>
          <strong>
            Keep building momentum
          </strong>

          <p>
            Small improvements repeated every day
            create stronger long-term habits.
          </p>
        </div>

      </div>

    </section>
  );
}

export default SmartInsights;