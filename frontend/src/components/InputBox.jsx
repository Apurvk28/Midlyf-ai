import { useState } from "react";
import { ArrowUp } from "lucide-react";

const InputBox = ({ onSend, loading }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="w-full absolute bottom-0 left-0 p-4 md:p-8 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-20">
      <div className="max-w-3xl mx-auto flex items-center gap-3 bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-2 rounded-[2rem] shadow-2xl focus-within:border-white/20 transition-all duration-300 group">
        
        <input
          className="flex-1 bg-transparent px-6 py-3.5 outline-none text-white placeholder-gray-500 font-medium text-[16px] w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask Midlyf AI..."
          disabled={loading}
        />
        
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="flex items-center justify-center w-12 h-12 shrink-0 bg-white text-black rounded-full transition-all duration-300 hover:bg-gray-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
        >
          <ArrowUp className="w-6 h-6 stroke-[3px]" />
        </button>

      </div>
    </div>
  );
};

export default InputBox;
