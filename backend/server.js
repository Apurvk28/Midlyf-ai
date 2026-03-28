const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("MIDLYF Backend Running 🚀");
});

// API test
app.get("/api/test", (req, res) => {
  res.json({ message: "API working 🔥" });
});

// Future Me route
app.post("/api/future-me", (req, res) => {
  const { message } = req.body;

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

// 🔥 TEST DB ROUTE
app.get("/test-db", async (req, res) => {
  const TestSchema = new mongoose.Schema({
    name: String,
  });

  const Test = mongoose.model("Test", TestSchema);

  await Test.create({ name: "Apurv" });

  res.send("Data inserted");
});

// Start server
app.listen(5001, () => {
  console.log("Server running on port 5001");
});