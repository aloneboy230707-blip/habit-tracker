import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyChart({ habits }) {

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const weeklyData = days.map((day) => ({
    day,
    completions: 0,
  }));

  habits.forEach((habit) => {

    (habit.completedDates || []).forEach((date) => {

      const dayIndex =
        new Date(date).getDay();

      weeklyData[dayIndex].completions += 1;

    });

  });

  const totalCompletions =
    weeklyData.reduce(
      (sum, item) =>
        sum + item.completions,
      0
    );

  const bestDay =
    weeklyData.reduce(
      (best, current) =>
        current.completions >
        best.completions
          ? current
          : best,
      weeklyData[0]
    );

  return (

    <div className="weekly-chart premium-chart-card">

      <div className="chart-card-header">

        <div>

          <span className="chart-eyebrow">
            THIS WEEK
          </span>

          <h2>
            📊 Weekly Activity
          </h2>

          <p>
            Track your habit completions across the week.
          </p>

        </div>

        <div className="chart-header-stat">

          <strong>
            {totalCompletions}
          </strong>

          <span>
            completions
          </span>

        </div>

      </div>


      <div className="chart-highlight">

        <span>
          🔥 Best day
        </span>

        <strong>
          {bestDay.day} · {bestDay.completions}
        </strong>

      </div>


      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={weeklyData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
            barCategoryGap="28%"
          >

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 11,
              }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#475569",
                fontSize: 10,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(139, 92, 246, 0.06)",
              }}
              contentStyle={{
                background: "#111827",
                border:
                  "1px solid rgba(139, 92, 246, 0.20)",
                borderRadius: "12px",
                color: "#F8FAFC",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.25)",
              }}
              labelStyle={{
                color: "#C4B5FD",
                fontWeight: 700,
              }}
            />

            <Bar
              dataKey="completions"
              fill="#8B5CF6"
              radius={[
                7,
                7,
                3,
                3,
              ]}
              maxBarSize={42}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default WeeklyChart;