// const { mutipleMongooseToObject } = require('../../util/mongoose');
//const Voucher = require('../models/Voucher');
const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class SiteController {
  //[GET] /#home
  index(req, res, next) {
    sql.connect(config, (err, result) => {
      let str = "SELECT * FROM Voucher Where Status='true'";
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str, function (err, result) {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            res.render('home', { vouchers: result.recordset });
            //res.json(result);
          }
        });
      }
    });
  }
}
module.exports = new SiteController();
