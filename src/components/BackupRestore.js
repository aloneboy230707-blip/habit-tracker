import React from "react";

function BackupRestore({ habits, setHabits }) {

  // Export JSON
  const exportData = () => {

    const dataStr = JSON.stringify(habits, null, 2);

    const blob = new Blob(
      [dataStr],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "habit-backup.json";

    a.click();

    URL.revokeObjectURL(url);

  };

  // Import JSON
  const importData = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

      try {

        const importedHabits = JSON.parse(
          e.target.result
        );

        setHabits(importedHabits);

      } catch {

        alert("Invalid backup file!");

      }

    };

    reader.readAsText(file);

  };

  return (

    <div className="backup-box">

      <button onClick={exportData}>
        ⬇ Export Backup
      </button>

      <input
        type="file"
        accept=".json"
        onChange={importData}
      />

    </div>

  );

}

export default BackupRestore;