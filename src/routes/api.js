const express = require('express');
const router = express.Router();
const apiController = require('../app/controllers/ApiController');

/////////////////////GET
router.get('/test', apiController.test);

router.get('/GetVoucherByID', apiController.GetVoucherByID);

router.get('/GetVouchersByPartnerID', apiController.GetVouchersByPartnerID);

router.get('/GetVouchersByTaiKhoan', apiController.GetVouchersByTaiKhoan);

router.get('/GetAllVoucherNguoiDung', apiController.GetAllVoucherNguoiDung);

router.get('/GetAllVoucherKhachSan', apiController.GetAllVoucherKhachSan);

router.get('/GetAllVoucherThueXe', apiController.GetAllVoucherThueXe);

router.get('/GetAllVoucherVeMayBay', apiController.GetAllVoucherVeMayBay);

router.get(
  '/GetAllVoucherCanHoBietThu',
  apiController.GetAllVoucherCanHoBietThu,
);

router.get('/GetAllVoucherTourDuLich', apiController.GetAllVoucherTourDuLich);

router.get(
  '/GetAllVoucherDuaDonSanBay',
  apiController.GetAllVoucherDuaDonSanBay,
);

router.get('/GetAllVoucher', apiController.GetAllVoucher);

router.get('/GetAllUser', apiController.GetAllUser);

////////////////////POST
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
router.post('/ChangeVoucherStatusByID', apiController.changeVoucherStatusByID);
router.post('/UserUseVoucher', apiController.UserUseVoucher);
router.post(
  '/UpdateUserPointByTaiKhoan',
  apiController.UpdateUserPointByTaiKhoan,
);

module.exports = router;
