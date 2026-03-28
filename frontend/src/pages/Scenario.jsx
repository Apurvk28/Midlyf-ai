import { useState } from "react";
import { getScenario } from "../services/api";

const Scenario = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await getScenario(input);
      setResult(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col min-h-full">
      <h1 className="text-3xl font-bold mb-2">Alternate Reality Generator 🎭</h1>
      <p className="text-gray-400 mb-8">What if you drop out? What if you move to Dubai? Enter a scenario and let AI simulate the brutal realistic consequences.</p>

      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="e.g., What if I quit my job and day trade full time?"
          className="flex-1 bg-gray-900 border border-gray-800 text-white px-6 py-4 rounded-xl outline-none focus:border-purple-500 shadow-inner text-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !input}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg whitespace-nowrap"
        >
          {loading ? "Simulating..." : "Simulate Scenario"}
        </button>
      </div>

      {result && (
        <div className="bg-gray-900 border border-purple-900/50 p-8 rounded-xl shadow-2xl mt-4 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full"></div>
          <h2 className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-4">Simulation Complete</h2>
          <p className="text-xl text-gray-200 leading-relaxed relative z-10 font-serif">
            "{result}"
          </p>
        </div>
      )}
    </div>
  );
};

export default Scenario;
