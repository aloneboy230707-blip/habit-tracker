import React from "react";

import Calendar
from "react-calendar";

import "react-calendar/dist/Calendar.css";

import HeatmapSection
from "./HeatmapSection";

function CalendarSection({

  selectedDate,

  setSelectedDate,

  habits,

  heatmapData,

}) {

  return (

    <div className="section">

      <div className="calendar-box">

        <h2>
          📅 Habit Calendar
        </h2>

        <Calendar

          onChange={setSelectedDate}

          value={selectedDate}

          tileClassName={({ date }) => {

            const formattedDate =

              date
                .toISOString()
                .split("T")[0];

            const completed =

              habits.some((habit) =>

                (
                  habit.completedDates || []
                ).includes(
                  formattedDate
                )
              );

            return completed
              ? "highlight"
              : null;

          }}

        />

      </div>

      <HeatmapSection
        heatmapData={heatmapData}
      />

    </div>

  );

}

export default CalendarSection;