const aiService = require("../services/aiService");

const handleFutureMeChat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await aiService.getFutureMeReply(message);
    res.json({ reply });
  } catch (error) {
    console.error("Error in futureMeController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleFutureMeChat
};
