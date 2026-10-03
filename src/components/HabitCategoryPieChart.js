import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function HabitCategoryPieChart({
  habits,
}) {

  const categoryCounts = {};

  habits.forEach((habit) => {

    const category =
      habit.category ||
      "General";

    categoryCounts[category] =
      (categoryCounts[category] || 0) + 1;

  });

  const data =
    Object.keys(categoryCounts).map(
      (category) => ({
        name: category,
        value:
          categoryCounts[
            category
          ],
      })
    );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA66CC",
    "#FF4444",
  ];

  return (
    <div className="stats-box">

      <h3>
        🥧 Habit Categories
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {data.map(
              (entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );

}

export default HabitCategoryPieChart;