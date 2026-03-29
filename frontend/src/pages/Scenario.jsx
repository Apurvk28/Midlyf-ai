import { useState } from "react";
import { Infinity as InfinityIcon } from "lucide-react";

const Scenario = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/features/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: input }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto px-6 py-12 flex justify-center scrollbar-hide">
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 text-gray-300 mb-8 backdrop-blur-md">
          <InfinityIcon className="w-3 h-3 text-indigo-400" />
          <span>Multiverse Engine</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 text-center leading-tight">
          Explore Alternate <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Realities</span>.
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-2xl mb-12 leading-relaxed">
          What if you drop out? What if you move to Dubai? Enter a scenario and let our AI simulate the realistic consequences of that pivot.
        </p>

        <form onSubmit={handleGenerate} className="w-full flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="e.g., What if I quit my job and day trade full time?"
            className="flex-1 bg-[#111111]/80 backdrop-blur-2xl border border-white/10 text-white px-8 py-5 rounded-full outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 text-lg shadow-2xl transition-all placeholder-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading || !input}
            className="bg-white text-black hover:bg-gray-200 px-10 py-5 rounded-full font-semibold transition-all disabled:opacity-50 text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] whitespace-nowrap active:scale-95"
          >
            {loading ? "Simulating..." : "Generate Reality"}
          </button>
        </form>

        {result && (
          <div className="w-full mt-12 bg-[#111111]/90 backdrop-blur-3xl border border-white/10 p-10 md:p-12 rounded-[2rem] shadow-2xl animate-fade-in relative text-left">
            <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <InfinityIcon className="w-4 h-4" /> Simulation Complete
            </h3>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-serif italic selection:bg-indigo-500/30">
              "{result}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Scenario;
