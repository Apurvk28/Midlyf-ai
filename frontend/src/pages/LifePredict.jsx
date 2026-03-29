import { useState } from "react";
import { TrendingUp } from "lucide-react";

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
      const res = await fetch("http://localhost:5001/api/features/life", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sleep, workHours, skills }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto px-6 py-12 flex justify-center scrollbar-hide">
      <div className="w-full max-w-3xl flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 text-gray-300 mb-8 backdrop-blur-md">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span>Timeline Analytics</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 text-center leading-tight">
          Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">Trajectory</span>.
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-xl mb-12">
          Enter your daily habits and skills to mathematically project your trajectory and success probability.
        </p>

        <div className="w-full bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <form onSubmit={handlePredict} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-3">
                 <label className="text-sm font-semibold text-gray-400">Sleep (Hours)</label>
                 <input type="number" required max="24" className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 text-white text-lg outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all placeholder-gray-600" value={sleep} onChange={(e) => setSleep(e.target.value)} />
               </div>
               <div className="space-y-3">
                 <label className="text-sm font-semibold text-gray-400">Work/Study (Hours)</label>
                 <input type="number" required max="24" className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 text-white text-lg outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all placeholder-gray-600" value={workHours} onChange={(e) => setWorkHours(e.target.value)} />
               </div>
            </div>
            
            <div className="space-y-3">
               <label className="text-sm font-semibold text-gray-400">Key Skills (Comma Separated)</label>
               <input type="text" required placeholder="Python, Sales, Networking" className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 text-white text-lg outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all placeholder-gray-600" value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-gray-200 px-8 py-5 rounded-full font-semibold transition-all disabled:opacity-50 text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              {loading ? "Calculating Trajectory..." : "Predict Future Timeline"}
            </button>
          </form>
        </div>

        {result && (
          <div className="w-full mt-10 bg-[#111111]/90 backdrop-blur-3xl border border-white/10 p-10 rounded-[2rem] shadow-2xl animate-fade-in divide-y divide-white/5">
             <div className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Projected Peak Income</h3>
                  <div className="text-4xl md:text-5xl tracking-tighter font-bold text-white">
                    {result.predictedIncome}
                  </div>
               </div>
               <div>
                  <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Success Probability</h3>
                  <div className={`text-4xl md:text-5xl tracking-tighter font-bold ${result.successProbability > 50 ? 'text-blue-400' : 'text-red-500'}`}>
                    {result.successProbability}%
                  </div>
               </div>
             </div>
             
             <div className="pt-8">
               <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                 <TrendingUp className="w-4 h-4" /> AI Trajectory Analysis
               </h3>
               <p className="text-gray-200 leading-relaxed text-lg">{result.feedback}</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default LifePredict;
