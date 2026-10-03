import React from "react";
import AchievementBadges from "../components/AchievementBadges";

function AchievementsPage({ habits }) {
  return (
    <div className="section">
      <h2>🏆 Achievements</h2>

      <AchievementBadges habits={habits} />
    </div>
  );
}

export default AchievementsPage;