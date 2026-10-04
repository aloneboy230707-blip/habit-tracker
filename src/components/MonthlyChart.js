import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyChart({ habits }) {

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = months.map(
    (month, index) => {

      let count = 0;

      habits.forEach((habit) => {

        (habit.completedDates || [])
          .forEach((date) => {

            const d = new Date(date);

            if (
              d.getMonth() === index
            ) {
              count++;
            }

          });

      });

      return {
        month,
        completed: count,
      };

    }
  );

  const totalCompleted =
    monthlyData.reduce(
      (sum, item) =>
        sum + item.completed,
      0
    );

  const bestMonth =
    monthlyData.reduce(
      (best, current) =>
        current.completed >
        best.completed
          ? current
          : best,
      monthlyData[0]
    );

  return (

    <div className="stats-box premium-chart-card monthly-chart-card">

      <div className="chart-card-header">

        <div>

          <span className="chart-eyebrow">
            YEAR OVERVIEW
          </span>

          <h2>
            📅 Monthly Analytics
          </h2>

          <p>
            See how your consistency changes throughout the year.
          </p>

        </div>

        <div className="chart-header-stat">

          <strong>
            {totalCompleted}
          </strong>

          <span>
            total
          </span>

        </div>

      </div>


      <div className="chart-highlight">

        <span>
          🏆 Best month
        </span>

        <strong>
          {bestMonth.month} · {bestMonth.completed}
        </strong>

      </div>


      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={monthlyData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
            barCategoryGap="25%"
          >

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 10,
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
              dataKey="completed"
              fill="#6366F1"
              radius={[
                7,
                7,
                3,
                3,
              ]}
              maxBarSize={38}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default MonthlyChart;