const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  category: String,
  difficulty: String,
  question: String,
  type: String,
  correct_answer: String,
  incorrect_answers: Array,
  correct_answer_index: Number,
});

module.exports = mongoose.model("Quiz", QuizSchema);
