const Joi = require('joi');
const {
  accountBookSchema: { createAccountBookSchema, updateAccountBookSchema, accountBookIdSchema },
} = require('../../schemas');

const options = {
  abortEarly: false,
};

/**
 * 작성자 - 김지유
 */
const createAccountBookValidator = async (req, res, next) => {
  const { body } = req;

  try {
    await createAccountBookSchema.validateAsync(body, options);
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }

  next();
};

/**
 * 작성자 - 김지유
 */
const updateAccountBookValidator = async (req, res, next) => {
  const {
    body,
    params: { accountBookId },
  } = req;

  try {
    await updateAccountBookSchema.validateAsync(body, options);
    await accountBookIdSchema.validateAsync(accountBookId, options);
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }

  next();
};

/**
 * 작성자 - 김지유
 */
const accountBookIdValidator = async (req, res, next) => {
  const {
    params: { accountBookId },
  } = req;

  try {
    await accountBookIdSchema.validateAsync(accountBookId, options);
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }

  next();
};

module.exports = {
  createAccountBookValidator,
  updateAccountBookValidator,
  accountBookIdValidator,
};
