const { verifyAccessToken, verifyRefreshToken } = require('../utils/jwtToken');

const checkTokenError = err => {
  if (err.name === 'TokenExpiredError') {
    const error = new Error('토큰이 만료되었습니다');
    error.status = 403;
    return error;
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

  return err;
};

/**
 * 작성자 : 김영우
 * 토큰 검증의 성공 실패 여부에 따라 다음 미들웨어 실행
 * @returns {middleware} : next()
 */
const isVerifyToken = async (req, res, next) => {
  let { authorization: token } = req.headers;

  if (!token) {
    const error = new Error('헤더에 토큰이 존재하지 않습니다');
    error.status = 401;
    return next(error);
  }
  if (token.startsWith('Bearer ')) {
    token = token.substring(7);
  } else {
    const error = new Error('토큰 타입이 유효하지 않습니다');
    error.status = 401;
    return next(error);
  }

  try {
    // 토큰 payload 값 미들웨어에서 공유
    req.decodedToken = await verifyAccessToken(token);
    return next();
  } catch (err) {
    console.error(err);
    const error = checkTokenError(err);
    return next(error);
  }
};

/**
 * 작성자 : 김영우
 * 토큰 검증의 성공 실패 여부에 따라 다음 미들웨어 실행
 * @returns {middleware} : next()
 */
const isVerifyRefresh = async (req, res, next) => {
  let { authorization: token } = req.headers;

  if (!token) {
    const error = new Error('헤더에 토큰이 존재하지 않습니다');
    error.status = 401;
    return next(error);
  }
  if (token.startsWith('Bearer ')) {
    token = token.substring(7);
  } else {
    const error = new Error('토큰 타입이 유효하지 않습니다');
    error.status = 401;
    return next(error);
  }

  try {
    // 토큰 payload 값 미들웨어에서 공유
    req.decodedToken = await verifyRefreshToken(token);
    return next();
  } catch (err) {
    console.error(err);
    const error = checkTokenError(err);
    return next(error);
  }
};

module.exports = {
  isVerifyToken,
  isVerifyRefresh,
};
