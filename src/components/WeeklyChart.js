import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyChart({
  habits,
}) {

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const weeklyData =
    days.map((day) => ({
      day,
      completions: 0,
    }));

  habits.forEach((habit) => {

    (
      habit.completedDates || []
    ).forEach((date) => {

      const dayIndex =
        new Date(date).getDay();

      weeklyData[
        dayIndex
      ].completions += 1;

    });

  });

  return (

    <div className="weekly-chart">

      <h2>
        📊 Weekly Activity
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart
          data={weeklyData}
        >

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="completions"
            fill="#4caf50"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default WeeklyChart;