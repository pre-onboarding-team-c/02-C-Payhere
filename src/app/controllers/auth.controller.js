const authService = require('../services/auth.service');

/**
 * 작성자 : 김영우
 * @returns {json} - access_token, refresh_token | 상태코드, 메시지
 */
const getNewToken = async (req, res, next) => {
  const { id: userId } = req.decodedToken;

  try {
    const result = await authService.getNewToken(userId);
    if (result instanceof Error) {
      return next(result);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

module.exports = {
  getNewToken,
};
