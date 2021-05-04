// const { mutipleMongooseToObject } = require('../../util/mongoose');
const Voucher = require('../models/Voucher');
const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class SiteController {
  //[GET] /#home
  index(req, res, next) {
    console.log(config.userName);
    sql.connect(config, (err, result) => {
      let str = 'SELECT * FROM VatTu';
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
            res.send(result.recordset);
          }
        });
      }
    });
  }
}
module.exports = new SiteController();
