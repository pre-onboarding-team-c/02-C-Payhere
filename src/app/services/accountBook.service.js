const { AccountBooks } = require('../../db/models');

// @ts-check

/**
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
 * @param {AccountBook} body - 생성을 원하는 AccountBook 정보
 * @returns {AccountBook} 생성된 AccountBook
 */
const createAccountBook = async body => {
  try {
    const accountBook = await AccountBooks.create(body);

    return accountBook;
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 수정
/**
 * 작성자 - 김지유
 * @param {{ date?: Date, type?: 'income' | 'expense', amount?: number, memo?: string }} body
 * @param {number} accountBookId - 수정하고 싶은 accountBookId
 */
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
/**
 * 작성자 - 김지유
 * @param {number} accountBookId - 삭제하고 싶은 accountBookId
 */
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
/**
 * 작성자 - 김지유
 * @param {number} accountBookId - 삭제하고 싶은 accountBookId
 */
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
/**
 * 작성자 - 김지유
 * @returns {Array<AccountBook>} 가계부 리스트
 */
const getAccountBooks = async () => {
  try {
    const accountBooks = await AccountBooks.findAll();

    return accountBooks;
  } catch (err) {
    throw new Error(err);
  }
};

// 가계부 상세내역
/**
 * 작성자 - 김지유
 * @param {number} accountBookId - 상세내역을 확인하고 싶은 accountBookId
 * @returns {AccountBook} 가계부 상세 내역
 */
const getAccountBook = async accountBookId => {
  try {
    const accountBook = await AccountBooks.findByPk(accountBookId);

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
