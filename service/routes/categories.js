const router = require("express").Router();
const Quiz = require("../models/Quiz");
router.get("/", async (req, res) => {
  const categories = await Quiz.find().distinct("category");
  res.send(categories);
});

module.exports = router;
