
const express = require('express');
const router = express.Router();

const addVoucherController = require('../app/controllers/AddVoucherController');

router.get('/', addVoucherController.show);

module.exports = router;