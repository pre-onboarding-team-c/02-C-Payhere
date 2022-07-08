const jwt = require('jsonwebtoken');

/**
 * 작성자 : 김영우
 * @param {User} user : 사용자 객체
 * @returns {string} : 해쉬된 토큰 문자열
 */
const generateAccessToken = user => {
  return jwt.sign(
    {
      type: 'access_token',
      id: user.id,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      issuer: 'teamc',
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
    },
  );
};

/**
 * 작성자 : 김영우
 * @param {User} user : 사용자 객체
 * @returns {string} : 해쉬된 토큰 문자열
 */
const generateRefreshToken = user => {
  return jwt.sign(
    {
      type: 'refresh_token',
      id: user.id,
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      issuer: 'teamc',
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN,
    },
  );
};

/**
 * 작성자 : 김영우
 * @param {string} token : 토큰 문자열
 * @returns {Object} : payload 객체
 */
const verifyAccessToken = token => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
};

/**
 * 작성자 : 김영우
 * @param {string} token : 토큰 문자열
 * @returns {Object} : payload 객체
 */
const verifyRefreshToken = token => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
