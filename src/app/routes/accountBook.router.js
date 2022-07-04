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

const router = express.Router();

// 가계부 작성
router.post('/', createAccountBook);

// 가계부 수정
router.patch('/:accountBookId', updateAccountBook);

// 가계부 삭제
router.delete('/:accountBookId', deleteAccountBook);

// 가계부 복구
router.patch('/restore/:accountBookId', restoreAccountBook);

// 가계부 리스트
router.get('/', getAccountBooks);

// 가계부 상세내역
router.get('/:accountBookId', getAccountBook);

module.exports = router;
