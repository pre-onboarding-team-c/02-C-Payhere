const Joi = require('joi');
const {
  accountBookDTO: { createAccountBookDTO, updateAccountBookDTO, accountBookIdDTO },
} = require('../../dto');

const options = {
  abortEarly: false,
};

const createAccountBookValidator = async (req, res, next) => {
  const { body } = req;

  try {
    await createAccountBookDTO.validateAsync(body, options);
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }

  next();
};

const updateAccountBookValidator = async (req, res, next) => {
  const {
    body,
    params: { accountBookId },
  } = req;

  try {
    await updateAccountBookDTO.validateAsync(body, options);
    await accountBookIdDTO.validateAsync(accountBookId, options);
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message });
  }

  next();
};

const accountBookIdValidator = async (req, res, next) => {
  const {
    params: { accountBookId },
  } = req;

  try {
    await accountBookIdDTO.validateAsync(accountBookId, options);
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
