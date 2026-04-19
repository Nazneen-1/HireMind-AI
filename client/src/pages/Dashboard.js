import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    totalInterviews: 0,
    highestScore: 0,
    latestScore: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/dashboard/stats/${user.id}`
        );

        setStats(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    if (user?.id) {
      fetchStats();
    }
  }, [user]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Welcome back, {user?.name}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2>Total Interviews</h2>
            <p className="text-3xl mt-4 font-bold">
              {stats.totalInterviews}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2>Highest Score</h2>
            <p className="text-3xl mt-4 font-bold">
              {stats.highestScore}/30
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h2>Latest Score</h2>
            <p className="text-3xl mt-4 font-bold">
              {stats.latestScore}/30
            </p>
          </div>

        </div>

        <div className="bg-gray-800 p-8 rounded-xl text-center">
          <button
            onClick={() => navigate("/interview")}
            className="bg-blue-600 px-8 py-3 rounded-lg"
          >
            Start Mock Interview
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;