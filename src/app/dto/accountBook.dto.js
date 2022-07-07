const Joi = require('joi');

const createAccountBookDTO = Joi.object().keys({
  date: Joi.date(),
  type: Joi.string().valid('income', 'expense').required(),
  amount: Joi.number().required(),
  memo: Joi.string(),
});

const updateAccountBookDTO = Joi.object().keys({
  date: Joi.date(),
  type: Joi.string().valid('income', 'expense'),
  amount: Joi.number(),
  memo: Joi.string(),
});

const accountBookIdDTO = Joi.string().guid({ version: 'uuidv4' }).required();

module.exports = {
  createAccountBookDTO,
  updateAccountBookDTO,
  accountBookIdDTO,
};
