const express = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');
const accountBookRouter = require('./accountBook.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/accountBooks', accountBookRouter);

module.exports = router;
