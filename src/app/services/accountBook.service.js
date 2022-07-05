const { AccountBooks } = require('../../db/models');

// 가계부 작성
/**
 * 작성자 - 김지유
 * @param {{ userId: number, date?: Date, type: 'income' | 'expense', amount: number, memo?: string }} body
 * @returns {{ date: Date, id: number, userId: number, type: 'income' | 'expense', amount: number, memo: string | null, updatedAt: Date, createdAt: Date }} - 생성된 AccountBook
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
 * @returns {Array<{ id: number, userId: number, date: Date, type: 'income' | 'expense', amount: number, memo: string | null, createdAt: Date, updatedAt: Date, deletedAt: Date | null }>} 가계부 리스트
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
 * @returns {{ id: number, userId: number, date: Date, type: 'income' | 'expense', amount: number, memo: string | null, createdAt: Date, updatedAt: Date, deletedAt: Date | null }} 가계부 상세 내역
 */
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
