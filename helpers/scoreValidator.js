const Joi = require("joi");

//scores validation

exports.validScores = (score) => {
  const schema = Joi.object().keys({
    scorer: Joi.string().required(),
    scorerTeam: Joi.string().required(),
    scorerGoals: Joi.number().required(),
  });

  return schema.validate(score);
};
