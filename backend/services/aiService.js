// Service layer to handle AI logic (prepares for future Hugging Face integration)

const getFutureMeReply = async (message) => {
  // Simple rule-based logic to be replaced by AI later
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("career")) {
    return "Focus on skills, consistency and networking 🚀";
  } else if (lowerMessage.includes("love")) {
    return "Emotions control karo, growth pe focus karo 💔➡️💪";
  } else {
    return "Discipline > Motivation. Start working now 🔥";
  }
};

module.exports = {
  getFutureMeReply
};
