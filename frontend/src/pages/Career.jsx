import { useState } from "react";
import { Briefcase } from "lucide-react";

const Career = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/features/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: input }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("Career analysis offline. The future is uncertain.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto px-6 py-12 flex justify-center scrollbar-hide">
      <div className="w-full max-w-3xl flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 text-gray-300 mb-8 backdrop-blur-md">
          <Briefcase className="w-3 h-3 text-emerald-400" />
          <span>Career Predictor</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 text-center leading-tight">
          Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Future Path</span>.
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-xl mb-12 leading-relaxed">
          Input your current skills, passions, and interests. Our strategic AI will chart a brutal but motivating trajectory for your futuristic career.
        </p>

        <div className="w-full bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <form onSubmit={handlePredict} className="flex flex-col gap-6">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-400 pl-2">Your Profile</label>
              <textarea
                className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 text-white text-lg outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 resize-none min-h-[160px] transition-all placeholder-gray-600"
                placeholder="e.g. Mastered React & Node.js, interested in AI engineering and spatial computing, seeking high income..."
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
              {loading ? "Calculating Trajectory..." : "Predict Career Path"}
            </button>
          </form>
        </div>

        {result && (
          <div className="w-full mt-10 bg-[#111111]/90 backdrop-blur-3xl border border-emerald-500/20 p-10 rounded-[2rem] shadow-2xl animate-fade-in relative overflow-hidden">
             {/* Emerald ambient glow inside card */}
             <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-emerald-600/20 blur-[80px] rounded-full pointer-events-none"></div>

             <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 relative z-10">Strategic Insight</h3>
             <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-medium relative z-10 whitespace-pre-line">
               {result}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Career;
