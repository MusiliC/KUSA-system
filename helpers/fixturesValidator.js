const Joi = require("joi");

//fixtures validation

exports.validFixtures = (fixture) => {
  const schema = Joi.object().keys({
    matchDayOne: Joi.array().required(),
    matchDayTwo: Joi.array(),
    matchDayThree: Joi.array(),
    matchDayFour: Joi.array(),
    matchDayFive: Joi.array(),
  });

  return schema.validate(fixture);
};
