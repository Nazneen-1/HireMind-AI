import { useEffect, useState } from "react";
import axios from "axios";

function Result() {
  const answers = JSON.parse(
    localStorage.getItem("answers")
  ) || [];

  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getAI = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/ai/feedback",
          { answers }
        );

        setScore(res.data.score);
        setFeedback(res.data.feedback);

      } catch (error) {
        setFeedback("Unable to load AI feedback.");
      }
    };

    getAI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Interview Result
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-semibold">
          AI Score: {score}/30
        </h2>

        <p className="mt-3 text-gray-300">
          {feedback}
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">
          Your Answers
        </h3>

        {answers.map((item, index) => (
          <p
            key={index}
            className="mb-3 text-gray-300"
          >
            {index + 1}. {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Result;