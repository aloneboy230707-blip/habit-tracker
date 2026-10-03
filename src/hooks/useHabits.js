import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import confetti from "canvas-confetti";

import {
  fetchHabits,
  addHabitService,
  updateHabitService,
  deleteHabitService,
} from "../services/habitService";

import {
  saveStats,
} from "../services/statsService";

function useHabits(
  user,
  setBadge,
  setEmoji
) {

  const [habits, setHabits] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // LOAD HABITS
  useEffect(() => {

    const loadHabits = async () => {

      if (!user) {
        setHabits([]);
        setLoading(false);
        return;
      }

      try {

        setLoading(true);

      const data =
  await fetchHabits(user.uid);

setHabits(data);

const totalXP =
  data.reduce(
    (sum, habit) =>
      sum + (habit.xp || 0),
    0
  );

const totalCompleted =
  data.reduce(
    (sum, habit) =>
      sum +
      (habit.completedDates
        ?.length || 0),
    0
  );

const highestStreak =
  Math.max(
    0,
    ...data.map(
      habit =>
        habit.longestStreak || 0
    )
  );

const totalHabits =
  data.length;

await saveStats(
  user.uid,
  {
    totalXP,
    totalCompleted,
    highestStreak,
    totalHabits,
  }
);

      } catch (error) {

        toast.error(error.message);

      } finally {

        setLoading(false);

      }

    };

    loadHabits();

  }, [user]);
  

  // ADD HABIT
  const addHabit = async (
  habit,
  category,
  difficulty,
  reminderTime
) => {

    if (!habit || !user) return;

    try {

const newHabit = {
  name: habit,
  category: category,
  difficulty: difficulty,
  reminderTime,
  order: habits.length,
  streak: 0,
  xp: 0,
  longestStreak: 0,
  missedDays: 0,
  notes: "",
  completedDates: [],
  streakHistory: [],     // ← ADD THIS
  uid: user.uid,
  createdAt: new Date().toISOString(),
  monthlyChallenge: false,
};
console.log(
  "User UID:",
  user.uid
);

console.log(
  "New Habit:",
  newHabit
);


      await addHabitService(
        newHabit
      );

      const updatedHabits =
        await fetchHabits(user.uid);

      setHabits(updatedHabits);
      const totalXP =
  updatedHabits.reduce(
    (sum, habit) =>
      sum + (habit.xp || 0),
    0
  );

const totalCompleted =
  updatedHabits.reduce(
    (sum, habit) =>
      sum +
      (habit.completedDates
        ?.length || 0),
    0
  );

const highestStreak =
  Math.max(
    0,
    ...updatedHabits.map(
      h =>
        h.longestStreak || 0
    )
  );

await saveStats(
  user.uid,
  {
    totalXP,
    totalCompleted,
    highestStreak,
    totalHabits:
      updatedHabits.length,
  }
);
      
      

      toast.success(
        "Habit Added"
      );

    } catch (error) {

      toast.error(error.message);

    }

  };

  // DELETE HABIT
  const deleteHabit = async (
    id
  ) => {

    try {

      await deleteHabitService(id);

      const updatedHabits =
        await fetchHabits(user.uid);

      setHabits(updatedHabits);

      toast.success(
        "Habit Deleted"
      );

    } catch (error) {

      toast.error(error.message);

    }

  };

  // EDIT HABIT
  const editHabit = async (
    id,
    editedText,
    setEditingId,
    setEditedText
  ) => {

    if (!editedText.trim()) return;

    try {

      await updateHabitService(
        id,
        {
          name: editedText,
        }
      );

      setEditingId(null);

      setEditedText("");

      const updatedHabits =
        await fetchHabits(user.uid);

      setHabits(updatedHabits);

      toast.success(
        "Habit Updated"
      );

    } catch (error) {

      toast.error(error.message);

    }

  };

  // COMPLETE HABIT
  
 const completeHabit = async (
  id,
  currentStreak,
  completedDates = [],
  longestStreak = 0,
  missedDays = 0,
  freezeCount = 0,
  currentXP = 0,
  streakHistory = [],
  difficulty = "Easy"
) => {

    const today = new Date();

    const todayString =
      today.toISOString().split("T")[0];
      const currentMonth =
  todayString.slice(0, 7); // Example: 2026-06

const monthlyCompleted =
  [...completedDates, todayString].filter(date =>
    date.startsWith(currentMonth)
  ).length;

    if (
      completedDates.includes(
        todayString
      )
    ) {

      toast.error(
        "Already completed today!"
      );

      return;

    }

    let newStreak = 1;
    
    

    if (
      completedDates.length > 0
    ) {

      const lastCompleted =
        new Date(
          completedDates[
            completedDates.length - 1
          ]
        );

      const diffTime =
        today - lastCompleted;

      const diffDays =
        Math.floor(
          diffTime /
          (
            1000 *
            60 *
            60 *
            24
          )
        );

      if (diffDays === 1) {

        newStreak =
          currentStreak + 1;

      } else if (diffDays > 1) {

  if (freezeCount > 0) {

    freezeCount--;

    toast.success(
      "❄️ Streak Freeze Used!"
    );

    newStreak = currentStreak;

  } else {

    missedDays =
      missedDays + (diffDays - 1);

    newStreak = 1;

  }

}



    }
    let badge = "";
let emoji = "";
let earnedXP = 10;

if (difficulty === "Medium") {
  earnedXP = 20;
}

if (difficulty === "Hard") {
  earnedXP = 30;
}



// Bonus XP
if (newStreak === 7) {
  earnedXP += 50;
}

if (newStreak === 30) {
  earnedXP += 100;
}

if (newStreak === 50) {
  earnedXP += 200;
}

if (newStreak === 100) {
  earnedXP += 500;
}

// Weekly Challenge
const day = today.getDay();

const startOfWeek = new Date(today);

startOfWeek.setDate(today.getDate() - day);

const weekStart = startOfWeek
  .toISOString()
  .split("T")[0];


const weeklyCompleted = habits.reduce(
  (total, habit) => {
    return (
      total +
      (habit.completedDates || []).filter(
        (date) => date >= weekStart
      ).length
    );
  },
  0
);

// Reward only when reaching 20
if (weeklyCompleted === 20) {

  earnedXP += 300;

  toast.success(
    "🏆 Weekly Challenge Completed! +300 XP"
  );

}
// Daily Mission Bonus
const completedToday =
  habits.filter((habit) =>
    (habit.completedDates || []).includes(todayString)
  ).length + 1;

if (completedToday >= 3) {
  earnedXP += 100;

  toast.success(
    "🎯 Daily Mission Completed! +100 XP"
  );
}


if (newStreak >= 100) {
  badge = "Legend";
  emoji = "👑";
} else if (newStreak >= 50) {
  badge = "Master";
  emoji = "🏆";
} else if (newStreak >= 30) {
  badge = "Champion";
  emoji = "🥇";
} else if (newStreak >= 14) {
  badge = "Warrior";
  emoji = "⚔️";
} else if (newStreak >= 7) {
  badge = "Consistent";
  emoji = "🔥";
} else if (newStreak >= 1) {
  badge = "Beginner";
  emoji = "🌱";
}

    try {
      const monthlyChampion =
  monthlyCompleted >= 20;

     await updateHabitService(id, {

  streak: newStreak,

  longestStreak: Math.max(longestStreak, newStreak),

  missedDays: missedDays,

  freezeCount: freezeCount,

  monthlyChallenge: monthlyChampion,

  xp: currentXP + earnedXP,

  streakHistory: [

    ...streakHistory,

    {
      date: todayString,
      streak: newStreak,
    },

  ],

  completedDates: [
    ...completedDates,
    todayString,
  ],

});

     const updatedHabits =
  await fetchHabits(user.uid);

setHabits(updatedHabits);
const totalXP =
  updatedHabits.reduce(
    (sum, habit) =>
      sum + (habit.xp || 0),
    0
  );

const totalCompleted =
  updatedHabits.reduce(
    (sum, habit) =>
      sum +
      (habit.completedDates
        ?.length || 0),
    0
  );

const highestStreak =
  Math.max(
    0,
    ...updatedHabits.map(
      h =>
        h.longestStreak || 0
    )
  );

await saveStats(
  user.uid,
  {
    totalXP,
    totalCompleted,
    highestStreak,
    totalHabits:
      updatedHabits.length,
  }
);
if (monthlyChampion) {

  setBadge("Monthly Champion");

  setEmoji("🏆");

  toast.success(
    "🏆 Monthly Challenge Completed!"
  );

  if (badge) {

    setTimeout(() => {

      setBadge(badge);

      setEmoji(emoji);

    }, 2500);

  }

} else if (badge) {

  setBadge(badge);

  setEmoji(emoji);

}

// 🎉 Show confetti on milestone streaks
if (
  newStreak === 7 ||
  newStreak === 14 ||
  newStreak === 30 ||
  newStreak === 50 ||
  newStreak === 100
) {
  confetti({
    particleCount: 200,
    spread: 90,
    origin: {
      y: 0.6,
    },
  });
}

// Success message
toast.success(
  `✅ Habit Completed! +${earnedXP} XP`
);

    } catch (error) {

      toast.error(error.message);

    }

  };

  // UPDATE NOTES
  const updateNotes = async (
    id,
    notes
  ) => {

    try {

      await updateHabitService(
        id,
        {
          notes: notes,
        }
      );

      const updatedHabits =
        await fetchHabits(user.uid);

      setHabits(updatedHabits);

    } catch (error) {

      toast.error(error.message);

    }

  };
  const reorderHabits = async (newOrder) => {

  try {

    for (let i = 0; i < newOrder.length; i++) {

      await updateHabitService(
        newOrder[i].id,
        {
          order: i,
        }
      );

    }

    setHabits(newOrder);

  } catch (error) {

    toast.error(error.message);

  }

};

 return {

  habits,

  setHabits,

  reorderHabits,

  loading,

  addHabit,

  deleteHabit,

  editHabit,

  completeHabit,

  updateNotes,

};

}

export default useHabits;