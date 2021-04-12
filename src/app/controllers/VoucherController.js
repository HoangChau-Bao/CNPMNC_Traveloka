const { mongooseToObject } = require('../../util/mongoose');
const Voucher = require('../models/Voucher');

class VoucherController {
  //[GET] /vouchers/:slug
  show(req, res, next) {
    Voucher.findOne({ slug: req.params.slug })
      .then((voucher) => {
        res.render('vouchers/show', { voucher: mongooseToObject(voucher) });
      })
      .catch(next);
  }
}
module.exports = new VoucherController();
