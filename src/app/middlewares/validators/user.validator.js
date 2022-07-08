const {
  userSchema: { signUserSchema },
} = require('../../schemas');

const options = {
  abortEarly: false,
};

/**
 * 작성자 - 김지유
 */
const signUserValidator = async (req, res, next) => {
  const { body } = req;

  try {
    await signUserSchema.validateAsync(body, options);
  } catch (err) {
    res.status(400);
    res.json({ code: 400, message: err.message });
  }

  next();
};

module.exports = {
  signUserValidator,
};
