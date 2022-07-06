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
const isVerifyToken = require('../middlewares/tokenMiddleware');

const router = express.Router();

// 가계부 작성
router.post('/', isVerifyToken, createAccountBook);

// 가계부 수정
router.patch('/:accountBookId', isVerifyToken, updateAccountBook);

// 가계부 삭제
router.delete('/:accountBookId', isVerifyToken, deleteAccountBook);

// 가계부 복구
router.patch('/restore/:accountBookId', isVerifyToken, restoreAccountBook);

// 가계부 리스트
router.get('/', isVerifyToken, getAccountBooks);

// 가계부 상세내역
router.get('/:accountBookId', isVerifyToken, getAccountBook);

module.exports = router;
