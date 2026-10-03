export const generateHeatmapData = (habits) => {

  const dateCountMap = {};

  habits.forEach((habit) => {

    (habit.completedDates || []).forEach((date) => {

      if (dateCountMap[date]) {
        dateCountMap[date] += 1;
      } else {
        dateCountMap[date] = 1;
      }

    });

  });

  return Object.keys(dateCountMap).map((date) => ({
    date,
    count: dateCountMap[date],
  }));

};

export const getWeeklyCompletedCount = (habits) => {

  const today = new Date();

  const weekAgo = new Date();

  weekAgo.setDate(today.getDate() - 7);

  let count = 0;

  habits.forEach((habit) => {

    (habit.completedDates || []).forEach((date) => {

      const completedDate = new Date(date);

      if (
        completedDate >= weekAgo &&
        completedDate <= today
      ) {
        count++;
      }

    });

  });

  return count;

};

export const filterHabits = (
  habits,
  search,
  filter
) => {

  return habits.filter((item) => {

    const matchesSearch =
      (item.name || "")
        .toLowerCase()
        .includes(
          (search || "").toLowerCase()
        );

    const matchesCategory =
      filter === "All"
        ? true
        : (item.category || "") === filter;

    return (
      matchesSearch &&
      matchesCategory
    );

  });

};