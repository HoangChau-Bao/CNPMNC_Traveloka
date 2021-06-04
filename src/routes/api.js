const express = require('express');
const router = express.Router();
const apiController = require('../app/controllers/ApiController');

router.get('/test', apiController.test);

router.post('/createVoucherKhachSan', apiController.createVoucherKhachSan);
router.post('/createVoucherThueXe', apiController.createVoucherThueXe);
router.post('/createVoucherVeMayBay', apiController.createVoucherVeMayBay);
router.post(
  '/createVoucherCanHoBietThu',
  apiController.createVoucherCanHoBietThu,
);
router.post('/createVoucherTourDuLich', apiController.createVoucherTourDuLich);
router.post(
  '/createVoucherDuaDonSanBay',
  apiController.createVoucherDuaDonSanBay,
);

module.exports = router;
