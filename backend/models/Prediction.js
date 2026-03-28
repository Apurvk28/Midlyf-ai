const mongoose = require("mongoose");

const predictionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    type: { type: String, required: true, enum: ["life", "scenario"] },
    inputData: { type: mongoose.Schema.Types.Mixed, required: true }, // e.g. { sleep: 6, work: 8 }
    result: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Prediction = mongoose.model("Prediction", predictionSchema);
module.exports = Prediction;
