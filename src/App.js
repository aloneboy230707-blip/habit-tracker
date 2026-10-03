import "react-calendar-heatmap/dist/styles.css";
import React, { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import useHabits from "./hooks/useHabits";

import AchievementPopup from "./components/AchievementPopup";
import LevelUpPopup from "./components/LevelUpPopup";

import LoginPage from "./pages/LoginPage";
import HabitsPage from "./pages/HabitsPage";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import SettingsPage from "./pages/SettingsPage";
import AchievementsPage from "./pages/AchievementsPage";
import ProfilePage from "./pages/ProfilePage";
import GoalGeneratorPage from "./pages/GoalGeneratorPage";
import AIHabitCoachPage from "./pages/AIHabitCoachPage";
import TomorrowPlannerPage from "./pages/TomorrowPlannerPage";

import Leaderboard from "./components/Leaderboard";
import RewardsShop from "./components/RewardsShop";
import ThemeSelector from "./components/ThemeSelector";

import { getHabitSuggestions } from "./utils/aiSuggestions";

import { updateLeaderboard } from "./services/leaderboardService";

import {
  saveProfile,
  fetchProfile,
} from "./services/profileService";

import {
  getWeeklyCompletedCount,
  generateHeatmapData,
  filterHabits,
} from "./utils/habitUtils";

import {
  fetchHabits,
  deleteAllHabitsService,
  importHabitsService,
} from "./services/habitService";

import { auth, provider } from "./firebase";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


function App() {
  const [user, setUser] = useState(null);

  const [habit, setHabit] = useState("");

  const [dailyGoal] = useState(5);

  const [reminderTime, setReminderTime] = useState(() => {
    return localStorage.getItem("reminderTime") || "20:00";
  });

  const [todayCompleted, setTodayCompleted] = useState(0);

  const [category, setCategory] = useState("General");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [sortBy, setSortBy] = useState("custom");

  const [showLevelPopup, setShowLevelPopup] = useState(false);

  const [oldLevel, setOldLevel] = useState(1);

  const [selectedHabit, setSelectedHabit] = useState(null);

  const [habitReminderTime, setHabitReminderTime] = useState("");

  const [difficulty, setDifficulty] = useState("Easy");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "beginner";
  });

  const [unlockedThemes, setUnlockedThemes] = useState(() => {
    const savedThemes = localStorage.getItem("unlockedThemes");

    return savedThemes
      ? JSON.parse(savedThemes)
      : ["beginner"];
  });

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [editingId, setEditingId] = useState(null);

  const [editedText, setEditedText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  const [badge, setBadge] = useState("");

  const [emoji, setEmoji] = useState("");

  const [xpSpent, setXpSpent] = useState(() => {
    return Number(localStorage.getItem("xpSpent")) || 0;
  });

  const [activePage, setActivePage] = useState("dashboard");


  // =====================================================
  // HABITS HOOK
  // =====================================================

  const {
    habits,
    setHabits,
    reorderHabits,
    loading,
    addHabit,
    deleteHabit,
    editHabit,
    completeHabit,
    updateNotes,
  } = useHabits(
    user,
    setBadge,
    setEmoji
  );


  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const showReminder = (message) => {
    if (!("Notification" in window)) {
      alert("Notifications are not supported.");
      return;
    }

    if (Notification.permission !== "granted") {
      console.log("Permission not granted");
      return;
    }

    console.log("showReminder executed");
    console.log("Creating notification...");

    const notification = new Notification(
      "⏰ Habit Tracker",
      {
        body: message,
        icon: "/logo192.png",
        requireInteraction: true,
        silent: false,
      }
    );

    console.log("Notification object created");

    notification.onshow = () => {
      console.log("Notification displayed");
    };

    notification.onerror = (e) => {
      console.log("Notification error:", e);
    };

    notification.onclick = () => {
      localStorage.setItem(
        "openDashboard",
        "true"
      );

      window.focus();

      notification.close();
    };
  };


  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      alert("Notifications are not supported.");
      return;
    }

    const permission =
      await Notification.requestPermission();

    if (permission === "granted") {
      alert("Notifications Enabled!");
    }
  };


  // =====================================================
  // REQUEST NOTIFICATION PERMISSION
  // =====================================================

  useEffect(() => {
    if (!("Notification" in window)) {
      return;
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);


  // =====================================================
  // OPEN DASHBOARD FROM NOTIFICATION
  // =====================================================

  useEffect(() => {
    const shouldOpenDashboard =
      localStorage.getItem(
        "openDashboard"
      );

    if (shouldOpenDashboard === "true") {
      setActivePage("dashboard");

      localStorage.removeItem(
        "openDashboard"
      );
    }
  }, []);


  // =====================================================
  // THEME
  // =====================================================

  useEffect(() => {
    console.log(
      "Current Theme:",
      theme
    );
  }, [theme]);


  useEffect(() => {
    const savedTheme =
      localStorage.getItem("darkMode");

    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);


  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      darkMode
    );
  }, [darkMode]);


  useEffect(() => {
    localStorage.setItem(
      "unlockedThemes",
      JSON.stringify(unlockedThemes)
    );
  }, [unlockedThemes]);


  // =====================================================
  // XP SPENT
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "xpSpent",
      xpSpent
    );
  }, [xpSpent]);


  // =====================================================
  // REMINDER TIME
  // =====================================================

  useEffect(() => {
    localStorage.setItem(
      "reminderTime",
      reminderTime
    );
  }, [reminderTime]);


  // =====================================================
  // LOGIN
  // =====================================================

  const login = async () => {
    try {
      const result =
        await signInWithPopup(
          auth,
          provider
        );

      console.log(
        "User:",
        result.user
      );

      console.log(
        "UID:",
        result.user.uid
      );

      setUser(result.user);

    } catch (error) {
      console.log(error);

      alert(error.message);
    }
  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {
    await signOut(auth);

    setHabits([]);

    setUser(null);
  };


  // =====================================================
  // AUTH STATE
  // =====================================================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
          } else {
            setUser(null);
          }
        }
      );

    return () => unsubscribe();
  }, []);


  // =====================================================
  // PROFILE
  // =====================================================

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const profile =
          await fetchProfile(
            user.uid
          );

        if (!profile) return;

        if (profile.theme) {
          setTheme(profile.theme);
        }

        if (profile.unlockedThemes) {
          setUnlockedThemes(
            profile.unlockedThemes
          );
        }

        if (
          profile.xpSpent !==
          undefined
        ) {
          setXpSpent(
            profile.xpSpent
          );
        }

        if (profile.reminderTime) {
          setReminderTime(
            profile.reminderTime
          );
        }

        if (
          profile.darkMode !==
          undefined
        ) {
          setDarkMode(
            profile.darkMode
          );
        }

      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );
      }
    };

    loadProfile();

  }, [user]);


  // =====================================================
  // CALCULATIONS
  // =====================================================

  const totalHabits =
    habits.length;


  const totalCompleted =
    habits.reduce(
      (total, currentHabit) =>
        total +
        (
          currentHabit.completedDates
            ?.length || 0
        ),
      0
    );


  const highestStreak =
    habits.reduce(
      (max, currentHabit) =>
        Math.max(
          max,
          currentHabit.longestStreak ||
            0
        ),
      0
    );


  const earnedXP =
    habits.reduce(
      (total, currentHabit) =>
        total +
        (currentHabit.xp || 0),
      0
    );


  const totalXP =
    Math.max(
      0,
      earnedXP - xpSpent
    );


  const level =
    Math.floor(
      totalXP / 100
    ) + 1;


  const progress =
    totalXP % 100;


  const nextLevelXP =
    100 - progress;


  // =====================================================
  // SAVE PROFILE
  // =====================================================

  useEffect(() => {
    if (!user) return;

    saveProfile(
      user.uid,
      {
        theme,
        unlockedThemes,
        xpSpent,
        reminderTime,
        darkMode,
        totalCompleted,
        highestStreak,
        totalHabits,
        totalXP,
      }
    );

  }, [
    user,
    theme,
    unlockedThemes,
    xpSpent,
    reminderTime,
    darkMode,
    totalCompleted,
    highestStreak,
    totalHabits,
    totalXP,
  ]);


  // =====================================================
  // LEADERBOARD
  // =====================================================

  useEffect(() => {
    if (!user) return;

    updateLeaderboard(
      user.uid,
      user.displayName,
      user.photoURL,
      totalXP,
      highestStreak
    );

  }, [
    user,
    totalXP,
    highestStreak,
  ]);


  // =====================================================
  // TODAY COMPLETED
  // =====================================================

  useEffect(() => {
    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    let completed = 0;

    habits.forEach(
      (currentHabit) => {
        if (
          (
            currentHabit.completedDates ||
            []
          ).includes(today)
        ) {
          completed++;
        }
      }
    );

    setTodayCompleted(
      completed
    );

  }, [habits]);


  // =====================================================
  // HEATMAP
  // =====================================================

  const heatmapData =
    generateHeatmapData(
      habits
    );


  // =====================================================
  // WEEKLY COMPLETED
  // =====================================================

  const weeklyCompleted =
    getWeeklyCompletedCount(
      habits
    );


  // =====================================================
  // FILTER HABITS
  // =====================================================

  const filteredHabits =
    filterHabits(
      habits || [],
      search,
      filter
    );


  // =====================================================
  // AI SUGGESTIONS
  // =====================================================

  const aiSuggestions =
    getHabitSuggestions(
      habits
    );


  // =====================================================
  // LEVEL POPUP
  // =====================================================

  useEffect(() => {
    if (level > oldLevel) {
      setShowLevelPopup(true);
      setOldLevel(level);
    }
  }, [
    level,
    oldLevel,
  ]);


  // =====================================================
  // RANK SYSTEM
  // =====================================================

  let rank = "🌱 Beginner";

  if (totalXP >= 2500) {
    rank = "👑 Legend";
  } else if (totalXP >= 1500) {
    rank = "🏆 Master";
  } else if (totalXP >= 1000) {
    rank = "🥇 Champion";
  } else if (totalXP >= 600) {
    rank = "⚔️ Warrior";
  } else if (totalXP >= 300) {
    rank = "⚡ Explorer";
  } else if (totalXP >= 100) {
    rank = "🔥 Rookie";
  }


  // =====================================================
  // REMINDER SYSTEM
  // =====================================================

  useEffect(() => {
    console.log(
      "Reminder useEffect mounted"
    );

    const interval =
      setInterval(() => {
        const now =
          new Date();

        const currentTime =
          now
            .toTimeString()
            .slice(0, 5);

        const today =
          now.toLocaleDateString(
            "en-CA"
          );

        const lastReminder =
          localStorage.getItem(
            "lastReminderDate"
          );

        if (
          currentTime ===
            reminderTime &&
          lastReminder !== today
        ) {
          console.log(
            "🔥 REMINDER TRIGGERED"
          );

          const pendingHabits =
            habits.filter(
              (currentHabit) =>
                !(
                  currentHabit
                    .completedDates ||
                  []
                ).includes(today)
            );

          if (
            pendingHabits.length > 0
          ) {
            alert(
              `Reminder Triggered! ${pendingHabits.length} habits remaining.`
            );

            showReminder(
              `You still have ${pendingHabits.length} habit${
                pendingHabits.length > 1
                  ? "s"
                  : ""
              } remaining today.`
            );

          } else {
            showReminder(
              "🎉 Great job! You completed all your habits today."
            );
          }

          localStorage.setItem(
            "lastReminderDate",
            today
          );
        }

      }, 30000);

    return () =>
      clearInterval(interval);

  }, [
    reminderTime,
    habits,
  ]);


  // =====================================================
  // CLEAR OLD REMINDER DATE
  // =====================================================

  useEffect(() => {
    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const lastReminder =
      localStorage.getItem(
        "lastReminderDate"
      );

    if (
      lastReminder &&
      lastReminder !== today
    ) {
      localStorage.removeItem(
        "lastReminderDate"
      );
    }

  }, []);


  // =====================================================
  // BACKUP EXPORT
  // =====================================================

  const exportBackup = () => {
    const backup = {
      habits,
      unlockedThemes,
      theme,
      reminderTime,
      xpSpent,
    };

    const data =
      JSON.stringify(
        backup,
        null,
        2
      );

    const blob =
      new Blob(
        [data],
        {
          type:
            "application/json",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "habit-tracker-backup.json";

    link.click();

    URL.revokeObjectURL(
      url
    );
  };


  // =====================================================
  // BACKUP IMPORT
  // =====================================================

  const importBackup = (e) => {
    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload =
      async (event) => {
        try {
          const backup =
            JSON.parse(
              event.target.result
            );

          // Restore Habits
          if (backup.habits) {
            await deleteAllHabitsService(
              user.uid
            );

            const habitsWithUid =
              backup.habits.map(
                (currentHabit) => ({
                  ...currentHabit,
                  uid: user.uid,
                })
              );

            await importHabitsService(
              habitsWithUid
            );

            const updatedHabits =
              await fetchHabits(
                user.uid
              );

            setHabits(
              updatedHabits
            );
          }


          // Restore Themes
          if (
            backup.unlockedThemes
          ) {
            setUnlockedThemes(
              backup.unlockedThemes
            );

            localStorage.setItem(
              "unlockedThemes",
              JSON.stringify(
                backup.unlockedThemes
              )
            );
          }


          // Restore Current Theme
          if (backup.theme) {
            setTheme(
              backup.theme
            );

            localStorage.setItem(
              "theme",
              backup.theme
            );
          }


          // Restore Reminder Time
          if (
            backup.reminderTime
          ) {
            setReminderTime(
              backup.reminderTime
            );

            localStorage.setItem(
              "reminderTime",
              backup.reminderTime
            );
          }


          // Restore XP
          if (
            backup.xpSpent !==
            undefined
          ) {
            setXpSpent(
              backup.xpSpent
            );

            localStorage.setItem(
              "xpSpent",
              backup.xpSpent
            );
          }


          alert(
            "✅ Backup Imported Successfully"
          );

          window.location.reload();

        } catch (error) {
          alert(
            "❌ Invalid Backup File"
          );

          console.error(error);
        }
      };

    reader.readAsText(file);
  };


  // =====================================================
  // RESET DATA
  // =====================================================

  const resetData = () => {
    const confirmReset =
      window.confirm(
        "Are you sure? This will delete all habits, XP, themes and settings."
      );

    if (!confirmReset) return;

    localStorage.removeItem(
      "habits"
    );

    localStorage.removeItem(
      "theme"
    );

    localStorage.removeItem(
      "xpSpent"
    );

    localStorage.removeItem(
      "unlockedThemes"
    );

    localStorage.removeItem(
      "reminderTime"
    );

    localStorage.removeItem(
      "lastReminderDate"
    );

    alert(
      "All data has been reset."
    );

    setHabits([]);

    window.location.reload();
  };


  // =====================================================
  // DRAG & DROP
  // =====================================================

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items =
      [...habits];

    const [
      reorderedItem,
    ] = items.splice(
      result.source.index,
      1
    );

    items.splice(
      result.destination.index,
      0,
      reorderedItem
    );

    reorderHabits(
      items
    );

    console.log(
      "New Order:",
      items
    );
  };


  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>

        <h2>
          Loading Habit Tracker...
        </h2>
      </div>
    );
  }


  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div
      className={`app ${
        darkMode
          ? "dark"
          : ""
      } ${theme}`}
    >

      <Sidebar
        activePage={
          activePage
        }
        setActivePage={
          setActivePage
        }
      />


      <div className="main-dashboard">

        <Toaster
          toastOptions={{
            style: {
              background:
                theme === "light"
                  ? "#ffffff"
                  : "#222222",

              color:
                theme === "light"
                  ? "#000000"
                  : "#ffffff",
            },
          }}
        />


        {!user ? (
          <LoginPage
            login={login}
          />
        ) : (

          <div>

            <Navbar
              user={user}
              logout={logout}
              darkMode={
                darkMode
              }
              setDarkMode={
                setDarkMode
              }
            />


            {activePage ===
              "leaderboard" && (
              <Leaderboard />
            )}


            {activePage ===
              "coach" && (
              <AIHabitCoachPage
                habits={habits}
                totalXP={
                  totalXP
                }
                todayCompleted={
                  todayCompleted
                }
              />
            )}


            {activePage ===
              "habits" && (
              <HabitsPage
                habit={habit}
                setHabit={setHabit}

                category={
                  category
                }
                setCategory={
                  setCategory
                }

                difficulty={
                  difficulty
                }
                setDifficulty={
                  setDifficulty
                }

                habitReminderTime={
                  habitReminderTime
                }
                setHabitReminderTime={
                  setHabitReminderTime
                }

                addHabit={
                  addHabit
                }

                search={
                  search
                }
                setSearch={
                  setSearch
                }

                filter={
                  filter
                }
                setFilter={
                  setFilter
                }

                sortBy={
                  sortBy
                }
                setSortBy={
                  setSortBy
                }

                habits={
                  habits
                }

                filteredHabits={
                  filteredHabits
                }

                editingId={
                  editingId
                }

                editedText={
                  editedText
                }

                setEditedText={
                  setEditedText
                }

                setEditingId={
                  setEditingId
                }

                completeHabit={
                  completeHabit
                }

                editHabit={
                  editHabit
                }

                deleteHabit={
                  deleteHabit
                }

                updateNotes={
                  updateNotes
                }

                handleDragEnd={
                  handleDragEnd
                }

                setSelectedHabit={
                  setSelectedHabit
                }
              />
            )}


            {activePage ===
              "shop" && (
              <RewardsShop
                totalXP={
                  totalXP
                }

                xpSpent={
                  xpSpent
                }

                setXpSpent={
                  setXpSpent
                }

                unlockedThemes={
                  unlockedThemes
                }

                setUnlockedThemes={
                  setUnlockedThemes
                }
              />
            )}


            {activePage ===
              "weeklyReport" && (
              <WeeklyReportPage
                user={user}
                habits={habits}
                totalXP={
                  totalXP
                }
              />
            )}


            {activePage ===
              "planner" && (
              <TomorrowPlannerPage
                habits={habits}
              />
            )}


            {activePage ===
              "goal-generator" && (
              <GoalGeneratorPage />
            )}


            {activePage ===
              "dashboard" && (
              <DashboardPage
                user={user}
                habits={habits}

                weeklyCompleted={
                  weeklyCompleted
                }

                totalXP={
                  totalXP
                }

                level={
                  level
                }

                progress={
                  progress
                }

                nextLevelXP={
                  nextLevelXP
                }

                rank={
                  rank
                }

                aiSuggestions={
                  aiSuggestions
                }

                addHabit={
                  addHabit
                }

                dailyGoal={
                  dailyGoal
                }

                todayCompleted={
                  todayCompleted
                }

                selectedDate={
                  selectedDate
                }

                setSelectedDate={
                  setSelectedDate
                }

                heatmapData={
                  heatmapData
                }

                selectedHabit={
                  selectedHabit
                }
              />
            )}


            {activePage ===
              "profile" && (
              <ProfilePage
                user={user}
                totalXP={
                  totalXP
                }
                level={
                  level
                }
                rank={
                  rank
                }
                highestStreak={
                  highestStreak
                }
                totalHabits={
                  totalHabits
                }
                totalCompleted={
                  totalCompleted
                }
                saveProfile={
                  saveProfile
                }
              />
            )}


            {activePage ===
              "themes" && (
              <div className="section">

                <ThemeSelector
                  unlockedThemes={
                    unlockedThemes
                  }

                  theme={
                    theme
                  }

                  setTheme={
                    setTheme
                  }
                />

                <h2>
                  Current Theme:{" "}
                  {theme}
                </h2>

              </div>
            )}


            {activePage ===
              "analytics" && (
              <div className="section">

                <AnalyticsPage
                  habits={
                    habits
                  }
                />

              </div>
            )}


            {activePage ===
              "achievements" && (
              <AchievementsPage
                habits={
                  habits
                }
              />
            )}


            {activePage ===
              "settings" && (
              <SettingsPage
                exportBackup={
                  exportBackup
                }

                importBackup={
                  importBackup
                }

                habits={
                  habits
                }

                unlockedThemes={
                  unlockedThemes
                }

                theme={
                  theme
                }

                reminderTime={
                  reminderTime
                }

                xpSpent={
                  xpSpent
                }

                enableNotifications={
                  enableNotifications
                }

                resetData={
                  resetData
                }

                setReminderTime={
                  setReminderTime
                }
              />
            )}

          </div>
        )}

      </div>


      {showLevelPopup && (
        <LevelUpPopup
          oldLevel={
            oldLevel
          }

          newLevel={
            level
          }

          rank={
            rank
          }

          onClose={() =>
            setShowLevelPopup(
              false
            )
          }
        />
      )}


      <AchievementPopup
        badge={
          badge
        }

        emoji={
          emoji
        }

        onClose={() => {
          setBadge("");
          setEmoji("");
        }}
      />

    </div>
  );
}


export default App;