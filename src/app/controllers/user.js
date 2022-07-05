const { userService } = require('../services');

/**
 * 작성자 : 김영우
 * @returns {json} - 코드, 메시지
 */
const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await userService.signInService(email, password, next);
    if (result) {
      return res
        .status(400)
        .json({ code: result.status, message: result.message });
    }

    return res.status(201).json({ code: 201, message: '회원가입 되었습니다' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  signIn,
};
