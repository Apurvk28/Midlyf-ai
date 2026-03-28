const aiService = require("../services/aiService");
const Chat = require("../models/Chat");

const handleFutureMeChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // Save User Message
    await Chat.create({ user: req.user._id, role: "user", message });

    // Get API reply
    const reply = await aiService.getFutureMeReply(message);

    // Save AI reply
    await Chat.create({ user: req.user._id, role: "ai", message: reply });

    res.json({ reply });
  } catch (error) {
    console.error("Error in futureMeController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Get Chat History
const getChatHistory = async (req, res) => {
  try {
    const history = await Chat.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

module.exports = { handleFutureMeChat, getChatHistory };
