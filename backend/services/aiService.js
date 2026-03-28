// Uses Hugging Face Inference API with a fallback rule-based system

const getHuggingFaceResponse = async (prompt, systemPrompt) => {
  const apiKey = process.env.HF_API_KEY;
  if (!apiKey || apiKey === "your_huggingface_api_key_here") {
    throw new Error("No Hugging Face API key available");
  }

  try {
    const res = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: `<s>[INST] ${systemPrompt}\n\nUser: ${prompt} [/INST]`,
          parameters: { max_new_tokens: 150, temperature: 0.7 },
        }),
      }
    );

    if (!res.ok) throw new Error("HF API failed");
    const data = await res.json();
    return data[0].generated_text.split("[/INST]")[1].trim();
  } catch (error) {
    console.error("HF API Error:", error.message);
    throw error;
  }
};

const getFutureMeReply = async (message, history = []) => {
  const systemPrompt = "You are the user's future self. You are brutally honest, slightly savage, but ultimately want them to succeed. Give short, punchy advice.";
  try {
    return await getHuggingFaceResponse(message, systemPrompt);
  } catch (err) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("career")) return "Focus on skills, consistency and networking 🚀";
    if (lowerMessage.includes("love")) return "Emotions control karo, growth pe focus karo 💔➡️💪";
    return "Discipline > Motivation. Start working now 🔥";
  }
};

const getToxicPercentage = async (message) => {
  const systemPrompt = "Analyze the toxicity of this message. Reply ONLY with a JSON object: {\"percentage\": 80, \"redFlags\": [\"manipulation\", \"insults\"], \"whoIsToxic\": \"sender\"}";
  try {
    const raw = await getHuggingFaceResponse(message, systemPrompt);
    return JSON.parse(raw);
  } catch (err) {
    return { percentage: Math.floor(Math.random() * 100), redFlags: ["Unknown"], whoIsToxic: "Unclear" };
  }
};

const getLifePrediction = async (data) => {
  const systemPrompt = "Predict the user's future based on their habits. Reply ONLY with a JSON object: {\"predictedIncome\": \"$50k - $80k\", \"successProbability\": 65, \"feedback\": \"Needs more sleep\"}";
  try {
    const raw = await getHuggingFaceResponse(JSON.stringify(data), systemPrompt);
    return JSON.parse(raw);
  } catch (err) {
    return { predictedIncome: "Uncertain", successProbability: 50, feedback: "Work harder, rest better." };
  }
};

const getScenario = async (scenario) => {
  const systemPrompt = "Simulate this life scenario brutally and realistically. Give a 3 sentence summary of the consequences.";
  try {
    return await getHuggingFaceResponse(scenario, systemPrompt);
  } catch (err) {
    return "The future is dark and uncertain. Prepare for the worst.";
  }
};

const getRealityCheck = async (data) => {
  const systemPrompt = "Give a brutal, savage reality check to someone who provided these stats. Be harsh but motivating.";
  try {
    return await getHuggingFaceResponse(JSON.stringify(data), systemPrompt);
  } catch (err) {
    return "You're slacking. Wake up and put in the work before it's too late.";
  }
};

module.exports = {
  getFutureMeReply,
  getToxicPercentage,
  getLifePrediction,
  getScenario,
  getRealityCheck
};
