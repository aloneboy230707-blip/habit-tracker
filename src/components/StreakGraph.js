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

function StreakGraph({ habits }) {

  const labels = habits.map(
    (habit) => habit.name
  );

  const streaks = habits.map(
    (habit) => habit.streak || 0
  );

  const data = {

    labels,

    datasets: [

      {

        label: "Current Streak",

        data: streaks,

        borderColor: "#1e1a33",

        backgroundColor:
          "rgba(39, 118, 125, 0.2)",

        tension: 0.4,

        fill: true,

      },

    ],

  };

  return (

    <div className="streak-graph">

      <h2>📈 Streak Graph</h2>

      <Line data={data} />

    </div>

  );

}

export default StreakGraph;