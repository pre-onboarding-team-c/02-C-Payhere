const { AccountBooks } = require('../../db/models');

// @ts-check

/**
 * 작성자 - 김지유
 * @typedef {Object} AccountBook
 * @property {number} [id] - 가계부 id
 * @property {number} userId - 가계부의 사용자 id
 * @property {Date} [date] - 해당 소비/지출 일시
 * @property {'income' | 'expense'} type - 가계부 타입. 소비/지출
 * @property {number} amount - 금액
 * @property {string | null} [memo] - 메모
 * @property {Date} [updatedAt] - 업데이트 일시
 * @property {Date} [createdAt] - 생성 일시
 * @property {Date} [deletedAt] - 삭제 일시
 */

// 가계부 작성
/**
 * 작성자 - 김지유
 * @param {string} userId
 * @param {AccountBook} body - 생성을 원하는 AccountBook 정보
 * @returns {AccountBook} 생성된 AccountBook
 */
const createAccountBook = async (userId, body) => {
  try {
    const accountBook = await AccountBooks.create({ userId, ...body });

    return accountBook;
  } catch (err) {
    err.status = 400;

    throw err;
  }
};

// 가계부 수정
/**
 * 작성자 - 김지유
 * @param {string} userId
 * @param {{ date?: Date, type?: 'income' | 'expense', amount?: number, memo?: string }} body
 * @param {number} accountBookId - 수정하고 싶은 accountBookId
 */
const updateAccountBook = async (userId, body, accountBookId) => {
  try {
    const [updatedRows] = await AccountBooks.update(body, {
      where: {
        userId,
        id: accountBookId,
      },
    });

    if (updatedRows === 0) {
      const error = Error(
        '해당 유저의 가계부 기록이 아니거나, 존재하지 않는 userId, 혹은 accountBookId 입니다.',
      );

      error.status = 404;

      throw error;
    }
  } catch (err) {
    throw err;
  }
};

// 가계부 삭제
/**
 * 작성자 - 김지유
 * @param {string} userId
 * @param {number} accountBookId - 삭제하고 싶은 accountBookId
 */
const deleteAccountBook = async (userId, accountBookId) => {
  try {
    const destroyedRows = await AccountBooks.destroy({
      where: {
        userId,
        id: accountBookId,
      },
    });

    if (destroyedRows === 0) {
      const error = Error(
        '해당 유저의 가계부 기록이 아니거나, 존재하지 않는 userId, 혹은 accountBookId 입니다.',
      );

      error.status = 404;

      throw error;
    }
  } catch (err) {
    throw err;
  }
};

// 가계부 복구
/**
 * 작성자 - 김지유
 * @param {string} userId
 * @param {number} accountBookId - 삭제하고 싶은 accountBookId
 */
const restoreAccountBook = async (userId, accountBookId) => {
  try {
    const accountBook = await AccountBooks.findByPk(accountBookId, { paranoid: false });

    if (accountBook.userId !== userId) {
      const error = Error(
        '해당 유저의 가계부 기록이 아니거나, 존재하지 않는 userId, 혹은 accountBookId 입니다.',
      );

      error.status = 404;

      throw error;
    }

    await AccountBooks.restore({
      where: {
        userId,
        id: accountBookId,
      },
    });

    return accountBook;
  } catch (err) {
    throw err;
  }
};

// 가계부 리스트
/**
 * 작성자 - 김지유
 * @param {string} userId
 * @returns {Array<AccountBook>} 가계부 리스트
 */
const getAccountBooks = async userId => {
  try {
    const accountBooks = await AccountBooks.findAll({
      where: {
        userId,
      },
    });

    return accountBooks;
  } catch (err) {
    err.status = 400;

    throw err;
  }
};

// 가계부 상세내역
/**
 * 작성자 - 김지유
 * @param {string} userId
 * @param {number} accountBookId - 상세내역을 확인하고 싶은 accountBookId
 * @returns {AccountBook} 가계부 상세 내역
 */
const getAccountBook = async (userId, accountBookId) => {
  try {
    const accountBook = await AccountBooks.findByPk(accountBookId);

    if (!accountBook) {
      const error = Error('존재하지 않는 accountBookId 입니다.');

      error.status = 404;

      throw error;
    }

    if (accountBook.userId !== userId) {
      const error = Error('해당 유저의 가계부 기록이 아니거나, 존재하지 않는 userId 입니다.');

      error.status = 404;

      throw error;
    }

    return accountBook;
  } catch (err) {
    throw err;
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
