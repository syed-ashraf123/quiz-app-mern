const router = require("express").Router();
const Quiz = require("../models/Quiz");
const { questionSchema } = require("../validation/validation");
router.get("/", async (req, res) => {
  // Validation
  const { error, value } = questionSchema(req.query);
  if (error) return res.status(400).send(error.details[0].message);

  // Destructuring
  const { difficulty, category } = req.query;

  // Find the questions
  const questions = await Quiz.aggregate([
    { $match: { difficulty, category } },
    { $sample: { size: 10 } },
  ]);

  // Send the questions
  res.send(questions);
});

module.exports = router;
