const express = require("express");
const aiService = require("../services/aiService");
const Prediction = require("../models/Prediction");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Toxic Detector
router.post("/toxic", protect, async (req, res) => {
  try {
    const result = await aiService.getToxicPercentage(req.body.message);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to analyze toxicity" });
  }
});

// Life Predictor
router.post("/life", protect, async (req, res) => {
  try {
    const data = req.body;
    const result = await aiService.getLifePrediction(data);
    await Prediction.create({ user: req.user._id, type: "life", inputData: data, result: JSON.stringify(result) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to predict life" });
  }
});

// Scenario Generator
router.post("/scenario", protect, async (req, res) => {
  try {
    const { scenario } = req.body;
    const result = await aiService.getScenario(scenario);
    await Prediction.create({ user: req.user._id, type: "scenario", inputData: { scenario }, result });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Failed to simulate scenario" });
  }
});

// Reality Check Engine
router.post("/reality", protect, async (req, res) => {
  try {
    const data = req.body;
    const result = await aiService.getRealityCheck(data);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Reality check failed" });
  }
});

// Dream Analyzer
router.post("/dream", protect, async (req, res) => {
  try {
    const { dream } = req.body;
    const result = await aiService.getDreamAnalysis(dream);
    await Prediction.create({ user: req.user._id, type: "dream", inputData: { dream }, result });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Failed to analyze dream" });
  }
});

// Career Path AI
router.post("/career", protect, async (req, res) => {
  try {
    const data = req.body;
    const result = await aiService.getCareerPrediction(data);
    await Prediction.create({ user: req.user._id, type: "career", inputData: data, result });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Failed to predict career path" });
  }
});

module.exports = router;
