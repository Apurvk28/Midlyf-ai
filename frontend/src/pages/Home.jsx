import { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/chats");
      if (!res.ok) return;
      const data = await res.json();
      const formatted = data.flatMap((chat) => [
        { role: "user", text: chat.message },
        { role: "ai", text: chat.reply },
      ]);
      setMessages(formatted.reverse());
    } catch (err) {
      console.warn("No chat history available from API yet.", err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleSendMessage = async (input) => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/future-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "Signal lost... Reality glitching. Try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return <ChatWindow messages={messages} loading={loading} onSendMessage={handleSendMessage} />;
};

export default Home;
