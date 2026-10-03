import "./XPCard.css";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
function XPCard({
  totalXP,
  level,
  progress,
  nextLevelXP,
  rank,
}) {
  return (
    <div className="xp-card">

      <h2>⭐ Level {level}</h2>

      <h3>{totalXP} XP</h3>

      <h4>🏅 Rank: {rank}</h4>

      <div className="xp-ring">

  <CircularProgressbar
    value={progress}
    text={`${progress}%`}
    styles={buildStyles({
      pathColor: "#3b82f6",
      textColor: "#ffffff",
      trailColor: "#e5e7eb",
    })}
  />

</div>

      <p>
        {nextLevelXP} XP until next level
      </p>

    </div>
  );
}

export default XPCard;