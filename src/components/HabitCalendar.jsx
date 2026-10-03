import React from "react";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import "./HabitCalendar.css";

function HabitCalendar({ habit }) {

  return (

    <div className="habit-calendar">

      <h2>
        📅 {habit.name} Calendar
      </h2>

      <Calendar
        tileClassName={({ date }) => {

          const year = date.getFullYear();

const month = String(
  date.getMonth() + 1
).padStart(2, "0");

const day = String(
  date.getDate()
).padStart(2, "0");

const dateString =
  `${year}-${month}-${day}`;

          if (
            habit.completedDates?.includes(
              dateString
            )
          ) {
            return "completed-day";
          }

          return null;

        }}
      />

    </div>

  );

}

export default HabitCalendar;