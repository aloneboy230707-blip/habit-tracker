export const getHabitSuggestions =
  (habits) => {

    const names = habits.map(
      habit =>
        habit.name.toLowerCase()
    );

    let suggestions = [];

    // Exercise
    if (
      names.some(name =>
        name.includes("exercise")
      )
    ) {
      suggestions.push(
        "💧 Drink Water",
        "🚶 Morning Walk",
        "😴 Sleep Before 11 PM"
      );
    }

    // Meditation
    if (
      names.some(name =>
        name.includes("meditation")
      )
    ) {
      suggestions.push(
        "📖 Read 10 Pages",
        "🧘 Deep Breathing",
        "📵 No Phone Before Bed"
      );
    }

    // Study
    if (
      names.some(name =>
        name.includes("study")
      )
    ) {
      suggestions.push(
        "📚 Revision Session",
        "✍️ Take Notes",
        "🎯 Practice Coding"
      );
    }

    // Reading
    if (
      names.some(name =>
        name.includes("reading")
      )
    ) {
      suggestions.push(
        "📝 Journal Writing",
        "🎧 Listen to Audiobooks"
      );
    }

    // Remove duplicates
    return [
      ...new Set(suggestions)
    ];

  };