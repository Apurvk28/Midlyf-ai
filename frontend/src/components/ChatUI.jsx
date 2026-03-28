import { useState, useEffect, useRef } from "react";
import { getFutureMeReply, getFutureMeHistory } from "../services/api";

const ChatUI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getFutureMeHistory();
        setMessages(history || []);
      } catch (err) {
        console.error("Failed to load history");
      }
    };
    fetchHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", message: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const replyText = await getFutureMeReply(input);
      const aiMsg = { role: "ai", message: replyText };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", message: "Failed to connect to the future. Try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-4xl mx-auto border border-gray-800 rounded-xl overflow-hidden bg-gray-950 shadow-2xl">
      <div className="bg-gray-900 border-b border-gray-800 p-4 shrink-0">
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
          Future Me Chat 🚀
        </h2>
        <p className="text-sm text-gray-400">Your brutally honest future self.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-500">
            Send a message to start chatting with your future self.
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] p-3 rounded-2xl ${msg.role === "user" ? "bg-green-600 text-white rounded-tr-none" : "bg-gray-800 text-gray-100 rounded-tl-none border border-gray-700"}`}>
              {msg.message}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 border border-gray-700 text-gray-400 p-3 rounded-2xl rounded-tl-none animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="p-4 bg-gray-900 border-t border-gray-800 shrink-0">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-green-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors disabled:opacity-50 shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
