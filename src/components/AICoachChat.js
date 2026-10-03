import React, { useState } from "react";

function AICoachChat({ habits }) {

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleAsk = () => {

    const remaining = habits.filter(
      h => !(h.completedDates || []).includes(today)
    );

    const q = question.toLowerCase();

    if (q.includes("today")) {

      setAnswer(
        `You have ${remaining.length} habits remaining today.`
      );

    }

    else if (
      q.includes("first")
    ) {

      if (remaining.length === 0) {

        setAnswer(
          "Excellent! Everything is completed."
        );

      } else {

        setAnswer(
          `Complete "${remaining[0].name}" first.`
        );

      }

    }

    else if (
      q.includes("performance")
    ) {

      setAnswer(
        `You have completed ${
          habits.length - remaining.length
        } out of ${
          habits.length
        } habits today.`
      );

    }

    else {

      setAnswer(
        "I don't understand that yet. More abilities are coming soon."
      );

    }

  };

  return (

    <div className="coach-chat">

      <h2>

        💬 AI Coach Chat

      </h2>

      <input

        value={question}

        onChange={(e)=>

          setQuestion(e.target.value)

        }

        placeholder="Ask your AI Coach..."

      />

      <button onClick={handleAsk}>

        Ask

      </button>

      {answer && (

        <div className="coach-answer">

          {answer}

        </div>

      )}

    </div>

  );

}

export default AICoachChat;