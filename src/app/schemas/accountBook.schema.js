const Joi = require('joi');

/**
 * 작성자 - 김지유
 */
const createAccountBookSchema = Joi.object().keys({
  date: Joi.date(),
  type: Joi.string().valid('income', 'expense').required(),
  amount: Joi.number().required(),
  memo: Joi.string(),
});

/**
 * 작성자 - 김지유
 */
const updateAccountBookSchema = Joi.object().keys({
  date: Joi.date(),
  type: Joi.string().valid('income', 'expense'),
  amount: Joi.number(),
  memo: Joi.string(),
});

/**
 * 작성자 - 김지유
 */
const accountBookIdSchema = Joi.string().guid({ version: 'uuidv4' }).required();

module.exports = {
  createAccountBookSchema,
  updateAccountBookSchema,
  accountBookIdSchema,
};
