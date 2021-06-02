const config = require('../config/db/dbconfig');
const sql = require('mssql');
module.exports = {
  CheckDateSQLOK: function () {
    sql.connect(config, (err, result) => {
      let str =
        'update Voucher set Status = 1 WHERE Getdate() > CONVERT(DATETIME, CreateDate) AND Getdate() < CONVERT(DATETIME, ExpDate)';
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
            console.log('OK lệnh Check hạn còn');
          }
        });
      }
    });
    //return console.log('OK');
  },

  CheckDateSQLNotOK: function () {
    sql.connect(config, (err, result) => {
      let str =
        'update Voucher set Status = 0 WHERE Getdate() < CONVERT(DATETIME, CreateDate) OR Getdate() > CONVERT(DATETIME, ExpDate)';
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
            console.log('OK Lệnh check hết hạn');
          }
        });
      }
    });
  },
};
