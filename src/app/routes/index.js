const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const accountBookRouter = require('./accountBook.router');
const {
  isVerifyToken,
  validators: { userValidators },
} = require('../middlewares');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userValidators.signUserValidator, userRouter);
router.use('/accountBooks', isVerifyToken, accountBookRouter);

module.exports = router;
