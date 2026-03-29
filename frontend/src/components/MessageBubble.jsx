import { Sparkles, User } from "lucide-react";

const MessageBubble = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} animate-fade-in group`}>
      <div className={`flex gap-4 max-w-[85%] md:max-w-[75%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        
        {/* Avatar */}
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isUser 
            ? "bg-white/10" 
            : "bg-gradient-to-tr from-purple-500 to-blue-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        }`}>
          {isUser ? <User className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
        </div>

        {/* Bubble - Visuo Rounded */}
        <div className={`px-6 py-4 rounded-[2rem] text-[16px] leading-relaxed font-medium transition-all duration-300 ${
          isUser
            ? "bg-[#1f1f1f] text-white rounded-tr-[8px] border border-white/5"
            : "bg-[#111111]/80 backdrop-blur-xl border border-white/10 text-gray-200 rounded-tl-[8px]"
        }`}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
