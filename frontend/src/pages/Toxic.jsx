import { useState } from "react";
import { ShieldAlert } from "lucide-react";

const Toxic = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/features/toxic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
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
          <ShieldAlert className="w-3 h-3 text-orange-400" />
          <span>Security Analysis</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 text-center leading-tight">
          Detect <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Toxic</span> Behavior.
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-xl mb-12">
          Paste a sketchy text from your ex or boss. We will scan it for manipulation and subtle red flags.
        </p>

        <div className="w-full bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <form onSubmit={handleAnalyze} className="flex flex-col gap-6">
            <textarea
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 text-white text-lg outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 resize-none h-40 transition-all placeholder-gray-600"
              placeholder="e.g. 'I'm not mad, I just think it's funny how...'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading || !input}
              className="w-full bg-white text-black hover:bg-gray-200 px-8 py-5 rounded-full font-semibold transition-all disabled:opacity-50 text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              {loading ? "Processing Data..." : "Run Analysis"}
            </button>
          </form>
        </div>

        {result && (
          <div className="w-full mt-10 bg-[#111111]/90 backdrop-blur-3xl border border-white/10 p-10 rounded-[2rem] shadow-2xl animate-fade-in divide-y divide-white/5">
             <div className="pb-8">
               <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Toxicity Level</h3>
               <div className={`text-6xl tracking-tighter font-bold ${result.toxicityLevel > 70 ? 'text-red-500' : result.toxicityLevel > 40 ? 'text-orange-400' : 'text-emerald-400'}`}>
                 {result.toxicityLevel}%
               </div>
             </div>
             
             <div className="py-8">
               <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Identified Patterns</h3>
               <ul className="text-gray-300 space-y-3 font-medium text-lg">
                 {result.redFlags.length > 0 ? result.redFlags.map((flag, idx) => (
                   <li key={idx} className="flex items-start gap-3">
                     <span className="text-red-500 font-bold shrink-0">⚑</span> 
                     <span>{flag}</span>
                   </li>
                 )) : <li className="text-emerald-400">✓ Clean communication.</li>}
               </ul>
             </div>
             
             <div className="pt-8">
               <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Psychological Profile</h3>
               <p className="text-gray-200 leading-relaxed text-lg">{result.aggressorProfile}</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Toxic;
