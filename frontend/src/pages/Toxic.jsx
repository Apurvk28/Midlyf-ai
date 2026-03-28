import { useState } from "react";
import { getToxicCheck } from "../services/api";

const Toxic = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await getToxicCheck(input);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">Toxic Detector ☠️</h1>
        <p className="text-gray-400">Paste your chat history or text to analyze toxicity, manipulation, and red flags using AI.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col">
          <textarea
            className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-4 text-white outline-none focus:border-red-500 mb-4 resize-none shadow-inner"
            placeholder="Paste a conversation or message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleCheck}
            disabled={loading || !input.trim()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg"
          >
            {loading ? "Scanning for Red Flags..." : "Analyze Toxicity"}
          </button>
        </div>

        {result ? (
          <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-2xl animate-fade-in">
            <h2 className="text-xl font-bold mb-6 text-gray-300 border-b border-gray-800 pb-2">Analysis Results</h2>
            <div className="flex items-center gap-4 mb-8">
              <div className={`text-6xl font-black ${result.percentage > 50 ? 'text-red-500' : 'text-green-500'}`}>
                {result.percentage}%
              </div>
              <div className="text-2xl font-semibold text-gray-400">Toxic</div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2">Aggressor Profile</h3>
                <p className="text-lg text-white capitalize">{result.whoIsToxic}</p>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-2">Detected Red Flags 🚩</h3>
                {result.redFlags && result.redFlags.length > 0 ? (
                  <ul className="grid grid-cols-1 gap-2 mt-2">
                    {result.redFlags.map((flag, idx) => (
                      <li key={idx} className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-2 rounded-lg text-sm">
                        {flag}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-400">Clean! No red flags detected.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center border border-dashed border-gray-800 rounded-xl text-gray-600">
            Awaiting scan...
          </div>
        )}
      </div>
    </div>
  );
};

export default Toxic;
