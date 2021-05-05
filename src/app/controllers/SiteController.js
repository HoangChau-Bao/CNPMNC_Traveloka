// const { mutipleMongooseToObject } = require('../../util/mongoose');
const Voucher = require('../models/Voucher');
const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class SiteController {
  //[GET] /#home
  index(req, res, next) {
    console.log(config.userName);
    sql.connect(config, (err, vouchers) => {
      let str = 'SELECT * FROM Voucher';
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str, function (err, vouchers) {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            res.render('home', { vouchers: vouchers.recordset });
          }
        });
      }
    });
  }
}
module.exports = new SiteController();
