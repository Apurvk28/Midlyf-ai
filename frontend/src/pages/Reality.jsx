import { useState } from "react";
import { getRealityCheck } from "../services/api";

const Reality = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEngine = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const data = await getRealityCheck({ stats: input });
      setResult(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-10 text-red-500">
        <h1 className="text-5xl font-black mb-4 tracking-tight">Reality Check Engine 🧾</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">WARNING: This engine will shatter your ego. Enter your current life situation (bank balance, job, fitness) and brace yourself.</p>
      </div>

      <div className="w-full max-w-2xl text-center">
        <textarea
          className="w-full bg-gray-950 border-2 border-red-900/30 rounded-xl p-6 text-white text-lg outline-none focus:border-red-500 mb-6 resize-none shadow-inner h-40"
          placeholder="I have $500, I scroll TikTok 4 hours a day, and I want to be a millionaire..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleEngine}
          disabled={loading || !input}
          className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-xl font-black text-xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
          style={{ transform: loading ? 'scale(0.98)' : 'scale(1)' }}
        >
          {loading ? "BRACING FOR IMPACT..." : "DESTROY MY EGO"}
        </button>

        {result && (
          <div className="mt-12 bg-black border border-red-800 p-8 rounded-2xl shadow-2xl animate-fade-in relative text-left">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
            <div className="text-red-500 font-bold uppercase tracking-widest text-xs mb-4">System Verdict</div>
            <p className="text-2xl text-gray-300 font-light italic leading-relaxed">
              "{result}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reality;
