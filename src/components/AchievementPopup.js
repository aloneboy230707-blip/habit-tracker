import React from "react";
import "./AchievementPopup.css";

function AchievementPopup({ badge, emoji, onClose }) {
  if (!badge) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">

        <h1>{emoji}</h1>

        <h2>Congratulations!</h2>

        <h3>You unlocked</h3>

        <h2>{badge}</h2>

        <button onClick={onClose}>
          Awesome!
        </button>

      </div>
    </div>
  );
}

export default AchievementPopup;