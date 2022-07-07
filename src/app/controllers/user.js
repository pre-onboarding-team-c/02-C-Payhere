const { userService } = require('../services');

/**
 * 작성자 : 김영우
 * @returns {json} - 상태코드, 메시지
 */
const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await userService.signUpService(email, password);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(201).json({ code: 201, message: '회원가입 되었습니다' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

/**
 * 작성자 : 김영우
 * @returns {json} - access_token | 상태코드, 메시지
 */
const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await userService.signInService(email, password);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).json({ access_token: result });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

/**
 * 작성자 : 김영우
 * @returns {json} : access_token | 상태코드, 메시지
 */
const getAccessToken = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const result = await userService.getNewAccessToken(userId);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).json({ access_token: result });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  signUp,
  signIn,
  getAccessToken,
};
