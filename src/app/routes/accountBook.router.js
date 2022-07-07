const express = require('express');
const {
  accountBookController: {
    createAccountBook,
    updateAccountBook,
    deleteAccountBook,
    restoreAccountBook,
    getAccountBooks,
    getAccountBook,
  },
} = require('../controllers');
const {
  isVerifyToken,
  validators: {
    accountBookValidators: {
      createAccountBookValidator,
      updateAccountBookValidator,
      accountBookIdValidator,
    },
  },
} = require('../middlewares');

const router = express.Router();

// 가계부 작성
router.post('/', isVerifyToken, createAccountBookValidator, createAccountBook);

// 가계부 수정
router.patch('/:accountBookId', isVerifyToken, updateAccountBookValidator, updateAccountBook);

// 가계부 삭제
router.delete('/:accountBookId', isVerifyToken, accountBookIdValidator, deleteAccountBook);

// 가계부 복구
router.patch('/restore/:accountBookId', isVerifyToken, accountBookIdValidator, restoreAccountBook);

// 가계부 리스트
router.get('/', isVerifyToken, getAccountBooks);

// 가계부 상세내역
router.get('/:accountBookId', isVerifyToken, accountBookIdValidator, getAccountBook);

module.exports = router;
