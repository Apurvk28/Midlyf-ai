import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold">MIDLYF.ai</h1>

        <button
          onClick={() => navigate("/app")}
          className="bg-white text-black px-4 py-2 rounded-full hover:scale-105 transition"
        >
          Get Started
        </button>
      </div>

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center flex-1 px-4">
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Your Future is Already Watching You
        </h1>

        <p className="text-gray-400 max-w-2xl mb-8">
          Talk to your future self. Discover your reality.
          Understand what you're doing wrong.
        </p>

        <button
          onClick={() => navigate("/app")}
          className="bg-green-500 text-black px-8 py-4 rounded-xl text-lg hover:bg-green-400 transition"
        >
          Enter MIDLYF 🚀
        </button>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-10 py-20 bg-gray-900">
        <div className="bg-black p-6 rounded-xl hover:scale-105 transition">
          <h3 className="text-xl font-semibold">Future Me</h3>
          <p className="text-gray-400 mt-2">
            Talk to your future version and get brutally honest advice.
          </p>
        </div>

        <div className="bg-black p-6 rounded-xl hover:scale-105 transition">
          <h3 className="text-xl font-semibold">Toxic Detector</h3>
          <p className="text-gray-400 mt-2">
            Analyze chats and detect red flags instantly.
          </p>
        </div>

        <div className="bg-black p-6 rounded-xl hover:scale-105 transition">
          <h3 className="text-xl font-semibold">Life Predictor</h3>
          <p className="text-gray-400 mt-2">
            Predict your future based on your habits.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Landing;