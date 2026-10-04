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
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function StreakGraph({ habits }) {

  const labels = habits.map(
    (habit) => habit.name
  );

  const streaks = habits.map(
    (habit) => habit.streak || 0
  );

  const highestStreak =
    streaks.length > 0
      ? Math.max(...streaks)
      : 0;

  const data = {

    labels,

    datasets: [

      {
        label: "Current Streak",

        data: streaks,

        borderColor: "#8B5CF6",

        backgroundColor:
          "rgba(139, 92, 246, 0.10)",

        pointBackgroundColor:
          "#A78BFA",

        pointBorderColor:
          "#111827",

        pointBorderWidth: 2,

        pointRadius: 4,

        pointHoverRadius: 6,

        borderWidth: 2.5,

        tension: 0.4,

        fill: true,
      },

    ],

  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {

      legend: {
        display: false,
      },

      tooltip: {

        backgroundColor:
          "#111827",

        borderColor:
          "rgba(139, 92, 246, 0.20)",

        borderWidth: 1,

        titleColor:
          "#C4B5FD",

        bodyColor:
          "#F8FAFC",

        padding: 12,

        cornerRadius: 10,

      },

    },

    scales: {

      x: {

        grid: {
          display: false,
        },

        ticks: {
          color: "#64748B",

          font: {
            size: 10,
          },

          maxRotation: 45,

          minRotation: 0,
        },

        border: {
          display: false,
        },

      },

      y: {

        beginAtZero: true,

        grid: {
          color:
            "rgba(255,255,255,0.045)",
        },

        ticks: {
          color: "#64748B",

          precision: 0,

          font: {
            size: 10,
          },
        },

        border: {
          display: false,
        },

      },

    },

  };

  return (

    <div className="streak-graph premium-chart-card">

      <div className="chart-card-header">

        <div>

          <span className="chart-eyebrow">
            CONSISTENCY
          </span>

          <h2>
            🔥 Streak Performance
          </h2>

          <p>
            Compare your current streak across habits.
          </p>

        </div>

        <div className="chart-header-stat">

          <strong>
            {highestStreak}
          </strong>

          <span>
            best streak
          </span>

        </div>

      </div>


      <div className="streak-chart-wrapper">

        {habits.length === 0 ? (

          <div className="empty-chart-state">

            <div>
              🔥
            </div>

            <strong>
              No streak data yet
            </strong>

            <p>
              Complete a habit to start building your streak.
            </p>

          </div>

        ) : (

          <Line
            data={data}
            options={options}
          />

        )}

      </div>

    </div>

  );
}

export default StreakGraph;