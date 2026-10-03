import React from "react";

import AnalyticsDashboard from "../components/AnalyticsDashboard";
import AnalyticsBox from "../components/AnalyticsBox";
import StreakHistoryChart from "../components/StreakHistoryChart";
import HeatScore from "../components/HeatScore";
import HabitCategoryPieChart from "../components/HabitCategoryPieChart";
import WeeklyChart from "../components/WeeklyChart";
import MonthlyChart from "../components/MonthlyChart";
import StreakGraph from "../components/StreakGraph";
function AnalyticsPage({ habits }) {
  return (
    <>
      <AnalyticsDashboard habits={habits} />

      <div className="section">
        <AnalyticsBox habits={habits} />
      </div>

      <div className="section">
        <StreakHistoryChart habits={habits} />
      </div>

      <div className="section">
        <HeatScore habits={habits} />
      </div>

      <div className="section">
        <HabitCategoryPieChart habits={habits} />
      </div>

      <div className="section">
        <WeeklyChart habits={habits} />
      </div>

      <div className="section">
        <MonthlyChart habits={habits} />
      </div>

      <div className="section">
        <StreakGraph habits={habits} />
      </div>
    </>
  );
}

export default AnalyticsPage;