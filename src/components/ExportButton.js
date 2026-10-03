import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportButton({ habits }) {

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Habit Tracker Progress Report",
      14,
      20
    );

    const tableData = habits.map(
      (habit) => [
        habit.name,
        habit.category,
        habit.streak,
        habit.longestStreak,
        habit.missedDays,
        habit.completedDates?.length || 0,
      ]
    );

    autoTable(doc, {
      head: [[
        "Habit",
        "Category",
        "Streak",
        "Longest",
        "Missed",
        "Completed"
      ]],
      body: tableData,
      startY: 30,
    });

    doc.save(
      "Habit_Report.pdf"
    );
  };

  return (
    <button
      className="export-btn"
      onClick={exportPDF}
    >
      📄 Export PDF Report
    </button>
  );
}

export default ExportButton;