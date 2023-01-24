const Joi = require("joi");

//results validation

exports.validResults = (results) => {
  const schema = Joi.object().keys({
    matchDate: Joi.date().required(),
    homeTeam: Joi.string().required(),
    awayTeam: Joi.string().required(),
    homeTeamGoals: Joi.number().required(),
    homeTeamGoalScorer: Joi.array(),
    awayTeamGoalScorer: Joi.array(),
    awayTeamGoals: Joi.number().required(),
    homeTeamShots: Joi.number(),
    homeTeamFouls: Joi.number(),
    homeTeamYellow: Joi.number(),
    homeTeamRed: Joi.number(),
    homeTeamYellowPlayers: Joi.array().empty("").default("none"),
    homeTeamRedPlayers: Joi.array().empty("").default("none"),
    awayTeamShots: Joi.number(),
    awayTeamFouls: Joi.number(),
    awayTeamYellow: Joi.number(),
    awayTeamRed: Joi.number(),
    awayTeamYellowPlayers: Joi.array().empty("").default("none"),
    awayTeamRedPlayers: Joi.array().empty("").default("none"),
  });

  return schema.validate(results);
};
