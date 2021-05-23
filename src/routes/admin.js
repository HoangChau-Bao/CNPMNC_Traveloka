const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/vouchermanage', adminController.vouchermanage);
router.post('/vouchermanage/changestatus', adminController.changestatus);
router.post('/vouchermanage/deletevoucher', adminController.deletevoucher);

module.exports = router;
