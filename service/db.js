const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/quiz";
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongodb");
  }
);
