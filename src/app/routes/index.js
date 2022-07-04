const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'OK' });
});

module.exports = router;
