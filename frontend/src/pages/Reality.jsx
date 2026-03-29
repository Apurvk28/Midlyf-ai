import { useState } from "react";
import { Activity } from "lucide-react";

const Reality = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEngine = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/features/reality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats: input }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("Reality check failed to process. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto px-6 py-12 flex justify-center scrollbar-hide">
      <div className="w-full max-w-3xl flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 text-gray-300 mb-8 backdrop-blur-md">
          <Activity className="w-3 h-3 text-rose-400" />
          <span>Ego Check System</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 text-center leading-tight">
          Face Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Reality</span>.
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-xl mb-12 leading-relaxed">
          WARNING: This engine will shatter your ego. Enter your current life situation (bank balance, job, daily screen time) and brace for a brutally honest situational analysis.
        </p>

        <div className="w-full bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <form onSubmit={handleEngine} className="flex flex-col gap-6">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-400 pl-2">Your Current Status</label>
              <textarea
                className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 text-white text-lg outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 resize-none min-h-[160px] transition-all placeholder-gray-600"
                placeholder="e.g. I have $500, I scroll social media 4 hours a day, and I want to be a millionaire..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !input}
              className="w-full bg-white text-black hover:bg-gray-200 px-8 py-5 rounded-full font-semibold transition-all disabled:opacity-50 text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              {loading ? "Processing..." : "Process Reality Check"}
            </button>
          </form>
        </div>

        {result && (
          <div className="w-full mt-10 bg-[#111111]/90 backdrop-blur-3xl border border-rose-500/20 p-10 rounded-[2rem] shadow-2xl animate-fade-in relative overflow-hidden">
             {/* Red ambient glow inside card */}
             <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-rose-600/20 blur-[80px] rounded-full pointer-events-none"></div>

             <h3 className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-6 relative z-10">System Verdict</h3>
             <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium relative z-10">
               "{result}"
             </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Reality;
