const express = require('express');

const { authController } = require('../controllers');
const { isVerifyRefresh } = require('../middlewares/');

const router = express.Router();

router.get('/refresh-token', isVerifyRefresh, authController.getNewToken);

module.exports = router;
