import React from "react";
import BackupRestore from "../components/BackupRestore";
import ExportButton from "../components/ExportButton";

function SettingsPage({
  exportBackup,
  importBackup,
  habits,
  unlockedThemes,
  theme,
  reminderTime,
  xpSpent,
  enableNotifications,
  resetData,
  setReminderTime,
}) {
  return (
    <div className="settings-page">
      <h1>⚙️ Settings</h1>

      <div className="section">
        <h3>💾 Backup & Restore</h3>

        <BackupRestore
          exportBackup={exportBackup}
          importBackup={importBackup}
        />

        <ExportButton
          habits={habits}
          unlockedThemes={unlockedThemes}
          theme={theme}
          reminderTime={reminderTime}
          xpSpent={xpSpent}
        />

        <input
          type="file"
          accept=".json"
          onChange={importBackup}
        />
      </div>

      <div className="section">
        <h3>⏰ Daily Reminder</h3>

        <input
          type="time"
          value={reminderTime}
          onChange={(e) =>
            setReminderTime(e.target.value)
          }
        />
      </div>

      <div className="section">
        <button onClick={enableNotifications}>
          🔔 Enable Notifications
        </button>
      </div>

      <div className="section">
        <button onClick={resetData}>
          🗑 Reset All Data
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;