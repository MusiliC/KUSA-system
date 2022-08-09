const Joi = require("joi");

//results validation

exports.validResults = (results) => {
  const schema = Joi.object().keys({
    winningTeam: Joi.string().required(),
    loosingTeam: Joi.string().required(),
    winnerGoals: Joi.number().required(),
    looserGoals: Joi.number().required(),
  });

  return schema.validate(results);
};
