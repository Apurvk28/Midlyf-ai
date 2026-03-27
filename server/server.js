const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MIDLYF Backend Running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working 🔥" });
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});

app.post("/api/future-me", (req, res) => {
  const { message } = req.body;

  // Simple logic (AI later)
  let reply = "";

  if (message.toLowerCase().includes("career")) {
    reply = "Focus on skills, consistency and networking 🚀";
  } else if (message.toLowerCase().includes("love")) {
    reply = "Emotions control karo, growth pe focus karo 💔➡️💪";
  } else {
    reply = "Discipline > Motivation. Start working now 🔥";
  }

  res.json({ reply });
});