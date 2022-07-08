require('dotenv').config();
const jwt = require('jsonwebtoken');
const { isVerifyToken, isVerifyRefresh } = require('./tokenMiddleware');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwtToken');

let user, access_token, refresh_token;

beforeAll(() => {
  user = {
    id: 1,
    email: 'test@gmail.com',
    password: '$2b$12$n8sYRTDwTWWf2ZWOEmI8rOhZfwgJLlrmNkkAiCyzNbubQ1ZhubZi2',
  };
  access_token = generateAccessToken(user);
  refresh_token = generateRefreshToken(user);
});

describe('isVerifyToken 미들웨어', () => {
  const res = jest.fn();
  describe('토큰 검증 성공', () => {
    test('토큰 검증 성공', async () => {
      const req = {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };
      const next = jest.fn();
      await isVerifyToken(req, res, next);
      expect(req.decodedToken).toHaveProperty('id', 1);
      expect(next).toBeCalledTimes(1);
    });
  });

  describe('토큰 검증 실패', () => {
    test('authorization 없으면 401 응답', () => {
      const req = {
        headers: {},
      };
      const next = jest.fn();
      const error = new Error('헤더에 토큰이 존재하지 않습니다');
      error.status = 401;

      isVerifyToken(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(error);
    });

    test('Bearer type 없으면 401 응답', () => {
      const req = {
        headers: {
          authorization: `${access_token}`,
        },
      };
      const next = jest.fn();
      const error = new Error('토큰 타입이 유효하지 않습니다');
      error.status = 401;

      isVerifyToken(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(error);
    });

    test('토큰 만료 403 응답', async () => {
      const token = await jwt.sign({ id: 1 }, process.env.JWT_ACCESS_SECRET_KEY, {
        expiresIn: '60ms',
      });
      const req = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const next = jest.fn();
      const error = new Error('토큰이 만료되었습니다');
      error.status = 403;

      await isVerifyToken(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(error);
    });
  });
});

describe('isVerifyRefresh 미들웨어', () => {
  const res = jest.fn();
  describe('토큰 검증 성공', () => {
    test('토큰 검증 성공', async () => {
      const req = {
        headers: {
          authorization: `Bearer ${refresh_token}`,
        },
      };
      const next = jest.fn();
      await isVerifyRefresh(req, res, next);
      expect(req.decodedToken).toHaveProperty('id', 1);
      expect(next).toBeCalledTimes(1);
    });
  });

  describe('토큰 검증 실패', () => {
    test('authorization 없으면 401 응답', () => {
      const req = {
        headers: {},
      };
      const next = jest.fn();
      const error = new Error('헤더에 토큰이 존재하지 않습니다');
      error.status = 401;

      isVerifyRefresh(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(error);
    });

    test('Bearer type 없으면 401 응답', () => {
      const req = {
        headers: {
          authorization: `${refresh_token}`,
        },
      };
      const next = jest.fn();
      const error = new Error('토큰 타입이 유효하지 않습니다');
      error.status = 401;

      isVerifyRefresh(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(error);
    });

    test('토큰 만료 403 응답', async () => {
      const token = await jwt.sign({ id: 1 }, process.env.JWT_REFRESH_SECRET_KEY, {
        expiresIn: '60ms',
      });
      const req = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const next = jest.fn();
      const error = new Error('토큰이 만료되었습니다');
      error.status = 403;

      await isVerifyRefresh(req, res, next);
      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith(error);
    });
  });
});

afterAll(() => {
  (user = ''), (access_token = ''), (refresh_token = '');
});
