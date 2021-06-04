const config = require('./src/config/db/dbconfig');
const sql = require('mssql');

sql.connect(config, (err, result) => {
    let str = 'SELECT * FROM Voucher';
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
        //   res.render('admin/vouchermanage', {
        //     vouchers: result.recordset,
        //   });
          res.json(result);

          //console.log(result);
        }
      });
    }
  });