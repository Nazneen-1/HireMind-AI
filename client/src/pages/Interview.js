import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Interview() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const questions = [
    "Tell me about yourself.",
    "What are your strengths?",
    "Why should we hire you?"
  ];

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const nextQuestion = async () => {
    const updatedAnswers = [...answers, answer];

    setAnswers(updatedAnswers);
    setAnswer("");

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      try {
        // Get AI feedback + score
        const aiRes = await axios.post(
          "http://localhost:5000/api/ai/feedback",
          {
            answers: updatedAnswers
          }
        );

        const finalScore = aiRes.data.score;
        const finalFeedback = aiRes.data.feedback;

        // Save result in MongoDB
        await axios.post(
          "http://localhost:5000/api/result/save",
          {
            userId: user.id,
            answers: updatedAnswers,
            score: finalScore
          }
        );

        // Save locally for result page
        localStorage.setItem(
          "answers",
          JSON.stringify(updatedAnswers)
        );

        localStorage.setItem(
          "aiScore",
          finalScore
        );

        localStorage.setItem(
          "aiFeedback",
          finalFeedback
        );

        navigate("/result");

      } catch (error) {
        alert("Failed to complete interview");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl">

        <h1 className="text-4xl font-bold mb-6">
          Mock Interview
        </h1>

        <h2 className="text-xl mb-3">
          Question {index + 1} of {questions.length}
        </h2>

        <p className="text-gray-300 mb-6">
          {questions[index]}
        </p>

        <textarea
          rows="6"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="w-full p-4 rounded-lg bg-gray-700 text-white outline-none"
        />

        <button
          onClick={nextQuestion}
          className="mt-6 bg-blue-600 px-8 py-3 rounded-lg"
        >
          {index === questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>

      </div>
    </div>
  );
}

export default Interview;