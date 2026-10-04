import React from "react";
import "./Sidebar.css";

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      id: "dashboard",
      icon: "📊",
      label: "Dashboard",
    },
    {
      id: "habits",
      icon: "✅",
      label: "Habits",
    },
    {
      id: "analytics",
      icon: "📈",
      label: "Analytics",
    },
    {
      id: "achievements",
      icon: "🏆",
      label: "Achievements",
    },
    {
      id: "themes",
      icon: "🎨",
      label: "Themes",
    },
    {
      id: "profile",
      icon: "👤",
      label: "Profile",
    },
    {
      id: "settings",
      icon: "⚙️",
      label: "Settings",
    },
    {
      id: "weeklyReport",
      icon: "📊",
      label: "Weekly Report",
    },
    {
      id: "planner",
      icon: "📅",
      label: "Tomorrow Planner",
    },
    {
      id: "goal-generator",
      icon: "🎯",
      label: "Goal Generator",
    },
    {
      id: "coach",
      icon: "🤖",
      label: "AI Coach",
    },
  ];

  return (
    <aside className="sidebar-menu">

      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          🚀
        </div>

        <div className="sidebar-brand-text">
          <h2>HabitFlow</h2>
          <span>Build better habits</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-navigation">

        <div className="sidebar-section-title">
          WORKSPACE
        </div>

        {menuItems.slice(0, 6).map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="sidebar-item-icon">
              {item.icon}
            </span>

            <span className="sidebar-item-label">
              {item.label}
            </span>

            {activePage === item.id && (
              <span className="sidebar-active-indicator" />
            )}
          </button>
        ))}

        <div className="sidebar-section-title sidebar-section-spacer">
          MANAGEMENT
        </div>

        {menuItems.slice(6, 9).map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="sidebar-item-icon">
              {item.icon}
            </span>

            <span className="sidebar-item-label">
              {item.label}
            </span>

            {activePage === item.id && (
              <span className="sidebar-active-indicator" />
            )}
          </button>
        ))}

        <div className="sidebar-section-title sidebar-section-spacer">
          SMART TOOLS
        </div>

        {menuItems.slice(9).map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="sidebar-item-icon">
              {item.icon}
            </span>

            <span className="sidebar-item-label">
              {item.label}
            </span>

            {activePage === item.id && (
              <span className="sidebar-active-indicator" />
            )}
          </button>
        ))}

      </nav>

      {/* Bottom Card */}
      <div className="sidebar-bottom-card">
        <div className="sidebar-bottom-icon">
          ✨
        </div>

        <div>
          <strong>Stay consistent</strong>
          <span>Small steps every day.</span>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;