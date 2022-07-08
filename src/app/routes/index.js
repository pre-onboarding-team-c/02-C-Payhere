const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const accountBookRouter = require('./accountBook.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/accountBooks', accountBookRouter);

module.exports = router;
