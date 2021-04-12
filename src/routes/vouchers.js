const express = require('express');
const router = express.Router();

const voucherController = require('../app/controllers/VoucherController');

router.get('/:slug', voucherController.show);

module.exports = router;
