import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import { Sparkles } from "lucide-react";

const ChatWindow = ({ messages, loading, onSendMessage }) => {
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="w-full h-full relative flex flex-col items-center">
      <div 
        ref={scrollRef} 
        className="w-full max-w-3xl overflow-y-auto p-4 md:p-8 pb-40 space-y-8 scrollbar-hide flex flex-col h-full"
      >
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border border-white/20 bg-white/5 text-gray-300 mb-6 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>AI Powered Assistant</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Talk to your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">
                Future Self.
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md font-medium leading-relaxed">
              Experience the brutal reality of your projected timeline. Ask questions, receive flawless AI analysis.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} text={msg.text} />
        ))}

        {loading && (
          <div className="w-full flex justify-start animate-fade-in pl-[56px]">
            <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-[2rem] rounded-tl-[8px] flex items-center space-x-2 shadow-2xl">
              <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
        
        <div ref={bottomRef} className="h-4"></div>
      </div>
      
      <InputBox onSend={onSendMessage} loading={loading} />
    </div>
  );
};

export default ChatWindow;
