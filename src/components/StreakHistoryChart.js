import React from "react";

import {
  Line,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function StreakHistoryChart({ habits }) {

  if (!habits || habits.length === 0) {
    return null;
  }

  const datasets = habits.map((habit) => ({

    label: habit.name,

    data:
      habit.streakHistory?.map(
        (item) => item.streak
      ) || [],

    borderWidth: 3,

    tension: 0.4,

    fill: false,

  }));

  const maxLength = Math.max(
    ...habits.map(
      (h) => h.streakHistory?.length || 0
    )
  );

  const labels = [];

  for (let i = 1; i <= maxLength; i++) {
    labels.push(`Day ${i}`);
  }

  const data = {

    labels,

    datasets,

  };

  return (

    <div className="streak-chart-card">

      <h2>📈 Streak History</h2>

      <Line data={data} />

    </div>

  );

}

export default StreakHistoryChart;