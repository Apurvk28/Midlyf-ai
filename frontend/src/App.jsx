import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/future-me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">MIDLYF.ai 🚀</h1>

      <input
        type="text"
        placeholder="Ask your future self..."
        className="px-4 py-2 text-black rounded w-80 mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={sendMessage}
        className="bg-green-500 px-6 py-2 rounded mb-6"
      >
        Ask
      </button>

      {reply && (
        <div className="bg-gray-800 p-4 rounded w-80 text-center">
          {reply}
        </div>
      )}
    </div>
  );
}

export default App;