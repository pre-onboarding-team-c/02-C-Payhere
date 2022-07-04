const express = require('express');
const accountBookRouter = require('./accountBook.router');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'OK' });
});

router.use('/accountBooks', accountBookRouter);

module.exports = router;
