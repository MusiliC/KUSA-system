const Joi = require("joi");

//team validation

exports.validTeam = (team) => {
  const schema = Joi.object().keys({
    team: Joi.string().required(),
    county: Joi.string().required(),
    town: Joi.string().required(),
  });

  return schema.validate(team);
};
