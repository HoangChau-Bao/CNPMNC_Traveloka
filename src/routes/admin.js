const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const { route } = require('./user');

router.get('/vouchermanage', adminController.vouchermanage);
router.get('/usermanage', adminController.usermanage);
router.get('/usermanage/adduser', adminController.adduser);
router.post('/usermanage/adduserstore', adminController.adduserstore);
router.post('/vouchermanage/changestatus', adminController.changestatus);
router.post('/usermanage/changestatususer', adminController.changestatususer);

module.exports = router;
