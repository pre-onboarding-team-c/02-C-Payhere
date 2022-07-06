const bcrypt = require('bcrypt');

const { Users } = require('../../db/models');
const { generateAccessToken } = require('../utils/jwtToken');

/**
 * 작성자 : 김영우
 * @typedef {Users} - 사용자 Entity
 * @property {string} email - 사용자 이메일
 * @property {string} password - 사용자 비밀번호
 * @returns {null | Error} - 성공 | 에러
 */
const signUpService = async (email, password) => {
  try {
    const user = await Users.findOne({ where: { email } });
    if (user) {
      const error = new Error('가입되어 있는 사용자 입니다');
      error.status = 400;
      return error;
    }

    const hashPassword = await bcrypt.hash(password, 12);
    await Users.create({ email, password: hashPassword });

    return null;
  } catch (err) {
    console.error(err);
    const error = new Error('요청 값을 확인해주세요');
    error.status = 400;
    return error;
  }
};

/**
 * 작성자 : 김영우
 * @typedef {Users} - 사용자 Entity
 * @property {string} email - 사용자 이메일
 * @property {string} password - 사용자 비밀번호
 * @returns {id | Error} - 사용자 id | 에러
 */
const signInService = async (email, password) => {
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      const error = new Error('가입되어 있지 않은 사용자 입니다');
      error.status = 404;
      return error;
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      const error = new Error('아이디, 비밀번호를 확인해주세요');
      error.status = 404;
      return error;
    }

    const token = await generateAccessToken(user);
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  signUpService,
  signInService,
};
