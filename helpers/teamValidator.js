const Joi = require("joi");

//team validation

exports.validTeam = (team) => {
  const schema = Joi.object().keys({
    team: Joi.string().required(),
    county: Joi.string().required(),
    players: Joi.string().required(),
    wins: Joi.number(),
    draws: Joi.number(),
    lost: Joi.number(),
  });

  return schema.validate(team);
};
