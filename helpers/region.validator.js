const Joi = require("joi");

exports.validateRegionBody = (region) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    teams: Joi.array().min(1).required(),
  });

  return schema.validate(region);
};
