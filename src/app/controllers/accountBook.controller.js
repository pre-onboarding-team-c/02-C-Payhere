const { accountBookServices } = require('../services');

// 가계부 작성
const createAccountBook = async (req, res, next) => {
  const { body } = req;

  const accountBook = await accountBookServices.createAccountBook(body);

  res.status(201).json(accountBook);
};

// 가계부 수정
const updateAccountBook = async (req, res, next) => {
  const {
    body,
    params: { accountBookId },
  } = req;

  await accountBookServices.updateAccountBook(body, accountBookId);

  res.status(201);
};

// 가계부 삭제
const deleteAccountBook = async (req, res, next) => {
  const {
    params: { accountBookId },
  } = req;

  await accountBookServices.deleteAccountBook(accountBookId);

  res.status(204);
};

// 가계부 복구
const restoreAccountBook = async (req, res, next) => {
  const {
    params: { accountBookId },
  } = req;

  await accountBookServices.restoreAccountBook(accountBookId);

  res.status(201);
};

// 가계부 리스트
const getAccountBooks = async (req, res, next) => {
  const accountBooks = await accountBookServices.getAccountBooks();

  res.status(200).json(accountBooks);
};

// 가계부 상세내역
const getAccountBook = async (req, res, next) => {
  const {
    params: { accountBookId },
  } = req;

  const accountBook = await accountBookServices.getAccountBook(accountBookId);

  res.status(200).json(accountBook);
};

module.exports = {
  createAccountBook,
  updateAccountBook,
  deleteAccountBook,
  restoreAccountBook,
  getAccountBooks,
  getAccountBook,
};
