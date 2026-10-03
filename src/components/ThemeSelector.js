function ThemeSelector({
  unlockedThemes,
  theme,
  setTheme,
}) {

  const allThemes = [
    "beginner",
    "galaxy",
    "royal",
    "fire",
  ];

  return (

    <div className="theme-selector">

      <h2>🎨 Themes</h2>

      {allThemes.map((item) => {

        const isUnlocked =
          unlockedThemes.includes(item);

        return (

          <button
            key={item}
            className={
              theme === item
                ? "theme-btn active"
                : "theme-btn"
            }
            disabled={!isUnlocked}
            onClick={() => {
              if (isUnlocked) {
                setTheme(item);
              }
            }}
          >

            {item}

            {!isUnlocked && " 🔒"}

          </button>

        );

      })}

    </div>

  );

}

export default ThemeSelector;