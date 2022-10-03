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
    homeTeamYellowPlayers: Joi.string().empty("").default("none"),
    homeTeamRedPlayers: Joi.string().empty("").default("none"),
    awayTeamShots: Joi.number(),
    awayTeamFouls: Joi.number(),
    awayTeamYellow: Joi.number(),
    awayTeamRed: Joi.number(),
    awayTeamYellowPlayers: Joi.string().empty("").default("none"),
    awayTeamRedPlayers: Joi.string().empty("").default("none"),
  });

  return schema.validate(results);
};
