import React from "react";
import "./LevelUpPopup.css";

function LevelUpPopup({
  oldLevel,
  newLevel,
  rank,
  onClose,
}) {
  return (
    <div className="popup-overlay">

      <div className="level-popup">

        <h1>🎉 LEVEL UP!</h1>

        <h2>
          Level {oldLevel} → Level {newLevel}
        </h2>

        <h3>
          🏅 New Rank: {rank}
        </h3>

        <button onClick={onClose}>
          Awesome!
        </button>

      </div>

    </div>
  );
}

export default LevelUpPopup;