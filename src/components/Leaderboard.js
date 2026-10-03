import {
  useEffect,
  useState,
} from "react";

import {
  getTopXPUsers,
  getTopStreakUsers,
} from "../services/leaderboardService";

function Leaderboard() {

  const [topXP, setTopXP] =
    useState([]);

  const [topStreak, setTopStreak] =
    useState([]);

  useEffect(() => {

    const loadData =
      async () => {

        const xpUsers =
          await getTopXPUsers();

        const streakUsers =
          await getTopStreakUsers();

        setTopXP(
          xpUsers
        );

        setTopStreak(
          streakUsers
        );

      };

    loadData();

  }, []);

  return (
    <div>

      <h2>
        🥇 Top XP Users
      </h2>

      {topXP.map(
        (user, index) => (
          <div
            key={user.id}
          >
            {index + 1}.
            {" "}
            {user.name}
            {" "}
            -
            {" "}
            {user.totalXP}
            {" "}
            XP
          </div>
        )
      )}

      <h2>
        🥈 Top Streak Users
      </h2>

      {topStreak.map(
        (user, index) => (
          <div
            key={user.id}
          >
            {index + 1}.
            {" "}
            {user.name}
            {" "}
            -
            {" "}
            {user.highestStreak}
            {" "}
            Days
          </div>
        )
      )}

    </div>
  );
}

export default Leaderboard;