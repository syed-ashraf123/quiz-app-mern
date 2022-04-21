const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Quiz = require("./models/Quiz");
app.use(cors());
app.use(express.json());
require("./db");

// app.post("/populate", async (req, res) => {
//   await new Quiz(req.body).save();
//   res.send("ok");
// });

// Routes
app.use("/questions", require("./routes/questions"));
app.use("/register", require("./routes/register"));
app.use("/categories", require("./routes/categories"));
app.use("/leaderboard", require("./routes/leaderboard"));

// Start the server
app.listen(4000, () => {
  console.log("server is running on port 4000");
});
