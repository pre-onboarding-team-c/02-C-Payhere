const { AccountBooks } = require('../../db/models');

// 가계부 작성
const createAccountBook = body => {
  try {
    await AccountBooks.create(body);
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 수정
const updateAccountBook = (body, accountBookId) => {
  try {
    await AccountBooks.update(body, {
      where: {
        id: accountBookId,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 삭제
const deleteAccountBook = accountBookId => {
  try {
    await AccountBooks.destroy({
      where: {
        id: accountBookId,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 복구
const restoreAccountBook = accountBookId => {
  try {
    await AccountBooks.restore({
      where: {
        id: accountBookId,
      }
    })
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 리스트
const getAccountBooks = () => {
  try {
    await AccountBooks.findAll();
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 상세내역
const getAccountBook = accountBookId => {
  try {
    await AccountBooks.findByPk(accountBookId);
  } catch (err) {
    throw new Error(err);
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
