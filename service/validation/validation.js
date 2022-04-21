const joi = require("joi");
module.exports.registerSchema = (data) => {
  const Schema = joi.object().keys({
    name: joi.string().min(2).max(25).required(),
    email: joi.string().min(3).max(25).email().required(),
    score: joi.number().min(0).max(10).integer(),
  });
  return Schema.validate(data);
};

module.exports.questionSchema = (data) => {
  const Schema = joi.object().keys({
    category: joi.string().required(),
    difficulty: joi.string().required(),
  });
  return Schema.validate(data);
};
