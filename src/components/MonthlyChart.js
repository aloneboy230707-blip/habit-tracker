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

            const d =
              new Date(date);

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

  return (
    <div className="stats-box">

      <h3>
        📅 Monthly Analytics
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart
          data={monthlyData}
        >

          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="completed"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );

}

export default MonthlyChart;