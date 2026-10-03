import React from "react";

function DailyQuote() {

  const quotes = [

    "The secret of getting ahead is getting started.",

    "Small daily improvements lead to stunning results.",

    "Success is the sum of small efforts repeated every day.",

    "Discipline is choosing between what you want now and what you want most.",

    "Your habits shape your future.",

    "Stay consistent even when motivation fades.",

    "One step every day is enough to reach your goal.",

    "Don't watch the clock; do what it does. Keep going.",

    "Great things are built one habit at a time.",

    "Today's actions create tomorrow's success."

  ];

  const today = new Date();

  const dayNumber = Math.floor(
    today.getTime() / (1000 * 60 * 60 * 24)
  );

  const quote = quotes[
    dayNumber % quotes.length
  ];

  return (

    <div className="daily-quote">

      <h3>💡 Daily Motivation</h3>

      <p>"{quote}"</p>

    </div>

  );

}

export default DailyQuote;