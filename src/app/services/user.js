const { Users } = require('../../db/models');
const bcrypt = require('bcrypt');

/**
 * 작성자 : 김영우
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @returns {null | Error} - 성공 | 실패
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

module.exports = {
  signUpService,
};
