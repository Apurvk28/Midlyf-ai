const express = require("express");
const { handleFutureMeChat } = require("../controllers/futureMeController");

const router = express.Router();

// POST /api/future-me
router.post("/", handleFutureMeChat);

module.exports = router;
