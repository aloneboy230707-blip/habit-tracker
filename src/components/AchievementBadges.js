function AchievementBadge({ item }) {

  if (!item) {
    return null;
  }

  const streak = item.streak || 0;
  // Monthly Challenge Badge
if (item.monthlyChallenge) {
  return (
    <div className="achievement-badge">
      🏆 Monthly Champion
    </div>
  );
}

  let badge = "";
  let emoji = "";

  if (streak >= 100) {
    badge = "Legend";
    emoji = "👑";
  }
  else if (streak >= 50) {
    badge = "Master";
    emoji = "🏆";
  }
  else if (streak >= 30) {
    badge = "Champion";
    emoji = "🥇";
  }
  else if (streak >= 14) {
    badge = "Warrior";
    emoji = "⚔️";
  }
  else if (streak >= 7) {
    badge = "Consistent";
    emoji = "🔥";
  }
  else if (streak >= 1) {
    badge = "Beginner";
    emoji = "🌱";
  }

  if (!badge) {
    return null;
  }

  return (
    <div className="achievement-badge">
      {emoji} {badge}
    </div>
  );
}

export default AchievementBadge;