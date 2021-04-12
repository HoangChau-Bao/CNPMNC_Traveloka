
const Voucher = require('../models/Voucher');

class SiteController {
        
    //[GET] /#
    index(req, res) {     
        res.render('home');

    //    Voucher.find({}, function (error, vouchers) {
    //         if(!error)
    //             res.json(vouchers);
    //         else
    //             res.status(400).json({ error: 'ERROR !!!'});
    //    });
    }

}
module.exports = new SiteController();