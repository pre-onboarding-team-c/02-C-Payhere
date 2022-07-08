const { Users } = require('../../db/models');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwtToken');

/**
 * 작성자 : 김영우
 * 토큰 만료 시 재발급
 * @param {Integer} id : 사용자 아이디
 * @returns {string} : 토큰 문자열
 */
const getNewToken = async id => {
  try {
    const user = await Users.findOne({ where: { id } });
    if (!user) {
      const error = new Error('가입되어 있지 않은 사용자 입니다');
      error.status = 404;
      return error;
    }

    const decoded = await verifyRefreshToken(user.token);
    if (id !== decoded.id) {
      const error = new Error('토큰이 일치하지 않습니다');
      error.status = 404;
      return error;
    }

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    await Users.update(
      {
        token: refreshToken,
      },
      {
        where: { id },
      },
    );

    const token = { access_token: accessToken, refresh_token: refreshToken };
    return token;
  } catch (err) {
    console.error(err);
    if (err.name === 'TokenExpiredError') {
      const error = new Error('토큰이 만료되었습니다');
      error.status = 403;
      return next(error);
    }
    if (err.name === 'JsonWebTokenError') {
      let msg = '';
      if (err.message === 'invalid token') {
        msg = 'header or payload 구문을 분석할 수 없습니다';
      } else if (err.message === 'jwt malformed') {
        msg = '토큰 형식이 유효하지 않습니다';
      } else if (err.message === 'invalid signature') {
        msg = '유효하지 않은 서명입니다';
      }

      const error = new Error(msg);
      error.status = 401;
      return error;
    }
    throw err;
  }
};

module.exports = {
  getNewToken,
};
