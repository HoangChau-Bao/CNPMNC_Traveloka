const express = require('express');
const router = express.Router();
const voucherController = require('../app/controllers/VoucherController');

router.get('/addvoucher', voucherController.add);
router.get('/addvoucherpartner', voucherController.addvoucherpartner);
router.post('/store', voucherController.store);
router.post('/store2', voucherController.store2);
router.post('/deletevoucher', voucherController.deletevoucher);

router.get('/:slug', voucherController.show);

module.exports = router;
