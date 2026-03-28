import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch chat history
  const fetchChats = async () => {
    const res = await fetch("http://localhost:5001/api/chats");
    const data = await res.json();

    // Convert DB format to chat format
    const formatted = data.flatMap((chat) => [
      { role: "user", text: chat.message },
      { role: "ai", text: chat.reply },
    ]);

    setMessages(formatted.reverse());
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("http://localhost:5001/api/future-me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const aiMsg = { role: "ai", text: data.reply };
    setMessages((prev) => [...prev, aiMsg]);

    setInput("");
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <h1 className="text-center text-3xl font-bold p-4">
        MIDLYF.ai 🚀
      </h1>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs p-3 rounded ${
              msg.role === "user"
                ? "bg-green-500 ml-auto text-black"
                : "bg-gray-800 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 flex gap-2">
        <input
          className="flex-1 p-2 rounded text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your future self..."
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;