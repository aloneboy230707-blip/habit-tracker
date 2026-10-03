import React from "react";

function RewardsShop({
  totalXP,
  xpSpent,
  setXpSpent,
  unlockedThemes,
  setUnlockedThemes,
}) {

 const rewards = [
  {
    name: "galaxy",
    cost: 500,
  },
  {
    name: "royal",
    cost: 1000,
  },
  {
    name: "fire",
    cost: 2000,
  },
];

  const buyReward = (reward) => {

    if (totalXP < reward.cost) {

      alert("Not enough XP!");

      return;

    }

    if (
      unlockedThemes.includes(
        reward.name
      )
    ) {

      alert("Already unlocked!");

      return;

    }

    const updatedThemes = [
  ...new Set([
    ...unlockedThemes,
    reward.name,
  ]),
];
console.log(updatedThemes);
setUnlockedThemes(updatedThemes);

localStorage.setItem(
  "unlockedThemes",
  JSON.stringify(updatedThemes)
);
setXpSpent(
  xpSpent + reward.cost
);

    alert(
      `${reward.name} Theme Unlocked!`
    );

  };

  return (

    <div className="shop">

      <h2>🛒 Rewards Shop</h2>

      {rewards.map((reward) => (

        <div
          key={reward.name}
          className="shop-item"
        >

          <h3>
            🎨 {reward.name}
          </h3>

          <p>
            Cost: {reward.cost} XP
          </p>

          <button
            onClick={() =>
              buyReward(reward)
            }
          >
            Unlock
          </button>

        </div>

      ))}

    </div>

  );

}

export default RewardsShop;