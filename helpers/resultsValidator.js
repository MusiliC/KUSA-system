const Joi = require("joi");

//results validation

exports.validResults = (results) => {
  const schema = Joi.object().keys({
    homeTeam: Joi.string().required(),
    awayTeam: Joi.string().required(),
    homeTeamGoals: Joi.number().required(),
    awayTeamGoals: Joi.number().required(),
  });

  return schema.validate(results);
};
