const express = require("express");
const cors = require("cors");
const config = require("./config");
const futureMeRoutes = require("./routes/futureMeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MIDLYF Backend Running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working 🔥" });
});

app.use("/api/future-me", futureMeRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});