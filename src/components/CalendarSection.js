import React from "react";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import HeatmapSection from "./HeatmapSection";

function CalendarSection({
  selectedDate,
  setSelectedDate,
  habits,
  heatmapData,
}) {

  return (

    <div className="calendar-section">

      {/* =================================================
          HABIT CALENDAR
          ================================================= */}

      <div className="calendar-box">

        <div className="calendar-header">

          <div>

            <span className="calendar-eyebrow">
              TRACK YOUR CONSISTENCY
            </span>

            <h2>
              📅 Habit Calendar
            </h2>

            <p>
              See your completed habits and stay consistent.
            </p>

          </div>

          <div className="calendar-status">
            <span className="calendar-status-dot"></span>
            Active tracking
          </div>

        </div>


        {/* CALENDAR */}

        <div className="premium-calendar">

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
                  ).includes(formattedDate)
                );

              return completed
                ? "highlight"
                : null;

            }}

          />

        </div>


        {/* LEGEND */}

        <div className="calendar-legend">

          <div className="calendar-legend-item">

            <span className="legend-dot completed-dot"></span>

            <span>
              Habit completed
            </span>

          </div>

          <div className="calendar-legend-item">

            <span className="legend-dot today-dot"></span>

            <span>
              Today
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          HEATMAP
          ================================================= */}

      <div className="calendar-heatmap">

        <HeatmapSection
          heatmapData={heatmapData}
        />

      </div>

    </div>

  );

}

export default CalendarSection;