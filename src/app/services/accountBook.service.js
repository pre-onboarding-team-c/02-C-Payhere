const { AccountBooks } = require('../../db/models');

// 가계부 작성
const createAccountBook = async body => {
  try {
    const accountBook = await AccountBooks.create(body);

    return accountBook;
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 수정
const updateAccountBook = async (body, accountBookId) => {
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
const deleteAccountBook = async accountBookId => {
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
const restoreAccountBook = async accountBookId => {
  try {
    await AccountBooks.restore({
      where: {
        id: accountBookId,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 리스트
const getAccountBooks = async () => {
  try {
    const accountBooks = await AccountBooks.findAll();

    return accountBooks;
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 상세내역
const getAccountBook = async accountBookId => {
  try {
    const { dataValues: accountBook } = await AccountBooks.findByPk(
      accountBookId,
    );

    return accountBook;
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
