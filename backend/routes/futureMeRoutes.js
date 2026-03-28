const express = require("express");
const { handleFutureMeChat, getChatHistory } = require("../controllers/futureMeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, handleFutureMeChat);
router.get("/history", protect, getChatHistory);

module.exports = router;
