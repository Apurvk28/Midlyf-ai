import { useState } from "react";
import { getLifePrediction } from "../services/api";

const LifePredict = () => {
  const [sleep, setSleep] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getLifePrediction({ sleep, workHours, skills });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2">Life Predictor 🔮</h1>
      <p className="text-gray-400 mb-8 text-center max-w-2xl">Enter your daily habits and skills to see your brutal trajectory.</p>

      <form onSubmit={handlePredict} className="w-full max-w-md bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-2xl space-y-4 mb-8">
        <div>
          <label className="block text-gray-400 mb-1 text-sm font-bold">Average Sleep (Hours)</label>
          <input type="number" required max="24" className="w-full bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-green-400" value={sleep} onChange={(e) => setSleep(e.target.value)} />
        </div>
        <div>
          <label className="block text-gray-400 mb-1 text-sm font-bold">Daily Work/Study (Hours)</label>
          <input type="number" required max="24" className="w-full bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-green-400" value={workHours} onChange={(e) => setWorkHours(e.target.value)} />
        </div>
        <div>
          <label className="block text-gray-400 mb-1 text-sm font-bold">Key Skills (comma separated)</label>
          <input type="text" required placeholder="Python, Sales, Networking" className="w-full bg-gray-800 text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-green-400" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg transition-colors shadow-lg mt-4 disabled:opacity-50">
          {loading ? "Calculating Destiny..." : "Predict My Future"}
        </button>
      </form>

      {result && (
        <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl animate-fade-in text-center">
          <h2 className="text-xl text-gray-400 mb-4 uppercase tracking-wider font-bold border-b border-gray-800 pb-2">Prediction Results</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Projected Peak Income</div>
              <div className="text-3xl font-black text-green-400">{result.predictedIncome}</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Success Probability</div>
              <div className={`text-3xl font-black ${result.successProbability > 50 ? 'text-blue-400' : 'text-red-400'}`}>{result.successProbability}%</div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border-l-4 border-yellow-500 text-left">
            <h3 className="font-bold mb-2">AI Feedback:</h3>
            <p className="text-gray-300 leading-relaxed">{result.feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LifePredict;
