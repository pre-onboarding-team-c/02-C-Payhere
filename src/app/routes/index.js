const express = require('express');
const userRouter = require('./user');
const accountBookRouter = require('./accountBook.router');

const router = express.Router();

router.use('/users', userRouter);
router.use('/accountBooks', accountBookRouter);

module.exports = router;
