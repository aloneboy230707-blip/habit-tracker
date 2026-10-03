function Navbar({
  user,
  logout,
  darkMode,
  setDarkMode,
}) {
  return (
    <div className="top-bar">
      <h1>
        Welcome{" "}
        {user.displayName}
      </h1>

      <div>
        <button onClick={logout}>
          Logout
        </button>

        <button
  onClick={() =>
    setDarkMode(!darkMode)
  }
>
  {darkMode
    ? "☀️ Light"
    : "🌙 Dark"}
</button>
      </div>
    </div>
  );
}

export default Navbar;