const Joi = require('joi');

/**
 * 작성자 - 김지유
 */
const signUserSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string(),
});

module.exports = {
  signUserSchema,
};
