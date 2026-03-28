import { useState } from "react";
import { getFutureMeReply } from "../services/api";

const ChatUI = () => {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError("");
    setReply("");

    try {
      const response = await getFutureMeReply(input);
      setReply(response);
    } catch (err) {
      setError("Failed to reach your future self. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Ask your future self..."
        className="px-4 py-2 text-black rounded w-80 mb-4 outline-none focus:ring-2 focus:ring-green-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
      />

      <button
        onClick={sendMessage}
        className={`bg-green-500 hover:bg-green-600 transition-colors px-6 py-2 rounded mb-6 font-semibold w-80 text-white ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Consulting..." : "Ask"}
      </button>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded w-80 text-center mb-4">
          {error}
        </div>
      )}

      {reply && !error && (
        <div className="bg-gray-800 border border-gray-700 p-4 rounded w-80 text-center animate-fade-in">
          {reply}
        </div>
      )}
    </div>
  );
};

export default ChatUI;
