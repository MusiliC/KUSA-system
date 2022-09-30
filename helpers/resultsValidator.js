const Joi = require("joi");

//results validation

exports.validResults = (results) => {
  const schema = Joi.object().keys({
    homeTeam: Joi.string().required(),
    awayTeam: Joi.string().required(),
    homeTeamGoals: Joi.number().required(),
    awayTeamGoals: Joi.number().required(),
    homeTeamShots: Joi.number(),
    homeTeamFouls: Joi.number(),
    homeTeamYellow: Joi.number(),
    homeTeamRed: Joi.number(),
    homeTeamYellowPlayers: Joi.string(),
    homeTeamRedPlayers: Joi.string(),
    awayTeamShots: Joi.number(),
    awayTeamFouls: Joi.number(),
    awayTeamYellow: Joi.number(),
    awayTeamRed: Joi.number(),
    awayTeamYellowPlayers: Joi.string(),
    awayTeamRedPlayers: Joi.string(),
  });

  return schema.validate(results);
};
