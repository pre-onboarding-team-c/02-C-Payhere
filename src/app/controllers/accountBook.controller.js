const { accountBookServices } = require('../services');

// 가계부 작성
const createAccountBook = async (req, res, next) => {
  try {
    const {
      body,
      decodedToken: { id: userId },
    } = req;

    const result = await accountBookServices.createAccountBook(userId, body);

    res.status(201).json({ code: 201, message: '기록 완료되었습니다.', data: result });
  } catch (err) {
    err.status = err.status || 400;

    const { status, message } = err;

    res.status(status).json({ code: status, message, data: null });
  }
};

// 가계부 수정
const updateAccountBook = async (req, res, next) => {
  try {
    const {
      body,
      params: { accountBookId },
      decodedToken: { id: userId },
    } = req;

    await accountBookServices.updateAccountBook(userId, body, accountBookId);

    res.status(201).json({ code: 201, message: '수정 완료되었습니다.', data: null });
  } catch (err) {
    err.status = err.status || 400;

    const { status, message } = err;

    res.status(status).json({ code: status, message, data: null });
  }
};

// 가계부 삭제
const deleteAccountBook = async (req, res, next) => {
  try {
    const {
      params: { accountBookId },
      decodedToken: { id: userId },
    } = req;

    await accountBookServices.deleteAccountBook(userId, accountBookId);

    res.status(204).json({ code: 204, message: '삭제 완료되었습니다.', data: null });
  } catch (err) {
    err.status = err.status || 400;

    const { status, message } = err;

    res.status(status).json({ code: status, message, data: null });
  }
};

// 가계부 복구
const restoreAccountBook = async (req, res, next) => {
  try {
    const {
      params: { accountBookId },
      decodedToken: { id: userId },
    } = req;

    await accountBookServices.restoreAccountBook(userId, accountBookId);

    res.status(201).json({ code: 201, message: '복구 완료되었습니다.', data: null });
  } catch (err) {
    err.status = err.status || 400;

    const { status, message } = err;

    res.status(status).json({ code: status, message, data: null });
  }
};

// 가계부 리스트
const getAccountBooks = async (req, res, next) => {
  try {
    const {
      decodedToken: { id: userId },
    } = req;

    const result = await accountBookServices.getAccountBooks(userId);

    res.status(200).json({ code: 200, message: '정상 처리되었습니다.', data: result });
  } catch (err) {
    err.status = err.status || 400;

    const { status, message } = err;

    res.status(status).json({ code: status, message, data: null });
  }
};

// 가계부 상세내역
const getAccountBook = async (req, res, next) => {
  try {
    const {
      params: { accountBookId },
    } = req;

    const result = await accountBookServices.getAccountBook(userId, accountBookId);

    res.status(200).json({ code: 200, message: '정상 처리되었습니다.', data: result });
  } catch (err) {
    err.status = err.status || 400;

    const { status, message } = err;

    res.status(status).json({ code: status, message, data: null });
  }
};

module.exports = {
  createAccountBook,
  updateAccountBook,
  deleteAccountBook,
  restoreAccountBook,
  getAccountBooks,
  getAccountBook,
};
