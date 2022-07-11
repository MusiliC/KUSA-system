const Joi = require("joi");

//user validation

exports.validateUser = (user) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(200).required(),
    email: Joi.string().min(3).max(30).email().required(),
    number: Joi.string().min(8).required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(user);
};
