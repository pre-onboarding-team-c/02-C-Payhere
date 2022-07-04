const { accountBookServices } = require('../services');

// 가계부 작성
const createAccountBook = (req, res, next) => {
  const { body } = req;

  accountBookServices.createAccountBook(body);
};

// 가계부 수정
const updateAccountBook = (req, res, next) => {
  const {
    body,
    params: { accountBookId },
  } = req;

  accountBookServices.updateAccountBook(body, accountBookId);
};

// 가계부 삭제
const deleteAccountBook = (req, res, next) => {
  const {
    params: { accountBookId },
  } = req;

  accountBookServices.deleteAccountBook(accountBookId);
};

// 가계부 복구
const restoreAccountBook = (req, res, next) => {
  const {
    params: { accountBookId },
  } = req;

  accountBookServices.restoreAccountBook(accountBookId);
};

// 가계부 리스트
const getAccountBooks = (req, res, next) => {
  accountBookServices.getAccountBooks();
};

// 가계부 상세내역
const getAccountBook = (req, res, next) => {
  const {
    params: { accountBookId },
  } = req;

  accountBookServices.getAccountBook(accountBookId);
};

module.exports = {
  createAccountBook,
  updateAccountBook,
  deleteAccountBook,
  restoreAccountBook,
  getAccountBooks,
  getAccountBook,
};
