import CalendarHeatmap from "react-calendar-heatmap";

import "react-calendar-heatmap/dist/styles.css";

function HeatmapSection({
  heatmapData,
}) {
  return (
    <div>
      <h2>Progress Heatmap</h2>

      <CalendarHeatmap
        startDate={
          new Date("2026-01-01")
        }
        endDate={new Date()}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }

          return `color-scale-${value.count}`;
        }}
      />
    </div>
  );
}

export default HeatmapSection;