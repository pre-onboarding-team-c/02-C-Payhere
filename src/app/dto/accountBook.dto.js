const Joi = require('joi');

/**
 * 작성자 - 김지유
 */
const createAccountBookDTO = Joi.object().keys({
  date: Joi.date(),
  type: Joi.string().valid('income', 'expense').required(),
  amount: Joi.number().required(),
  memo: Joi.string(),
});

/**
 * 작성자 - 김지유
 */
const updateAccountBookDTO = Joi.object().keys({
  date: Joi.date(),
  type: Joi.string().valid('income', 'expense'),
  amount: Joi.number(),
  memo: Joi.string(),
});

/**
 * 작성자 - 김지유
 */
const accountBookIdDTO = Joi.string().guid({ version: 'uuidv4' }).required();

module.exports = {
  createAccountBookDTO,
  updateAccountBookDTO,
  accountBookIdDTO,
};
