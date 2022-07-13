const Joi = require("joi");

//event validation

exports.validEvent = (event) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    date: Joi.date().required(),
    host: Joi.string().required(),
  });

  return schema.validate(event);
};
