const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.get('/vouchermanage', adminController.vouchermanage);

module.exports = router;
