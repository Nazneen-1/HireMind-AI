import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">
        HireMind AI
      </h1>

      <p className="text-lg text-gray-300 mb-8">
        AI Powered Interview Platform
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-blue-600 px-6 py-2 rounded-lg"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-green-600 px-6 py-2 rounded-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;