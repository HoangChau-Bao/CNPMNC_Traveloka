const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class AdminController {
  //[GET] /admin/vouchermanage
  vouchermanage(req, res) {
    //res.render('admin/vouchermanage');

    if (req.isAuthenticated()) {
      if (req.user.ChucVu == true) {
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
                res.render('admin/vouchermanage', {
                  vouchers: result.recordset,
                });
                //res.json(result);
              }
            });
          }
        });
      } else {
        res.redirect('/');
      }
    } else {
      res.redirect('/');
    }
  }

  //[POST] /admin/vouchermanage/changestatus
  changestatus(req, res) {
    sql.connect(config, (err, result) => {
      let str =
        "UPDATE Voucher SET Status = 'false' WHERE Code= '" +
        req.body.Code +
        "';";
      let str2 =
        "UPDATE Voucher SET Status = 'true' WHERE Code= '" +
        req.body.Code +
        "';";
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        if (req.body.Status == 'true') {
          request.query(str, function (err, result) {
            if (err) {
              console.log('ERROR ' + err);
              throw err;
            } else {
              res.redirect('/admin/vouchermanage');
            }
          });
        } else {
          request.query(str2, function (err, result) {
            if (err) {
              console.log('ERROR ' + err);
              throw err;
            } else {
              res.redirect('/admin/vouchermanage');
            }
          });
        }
      }
    });
  }

  //[POST] /admin/vouchermanage/deletevoucher
  deletevoucher(req, res) {
    console.log('Delete voucher');
    res.send(req.body);
  }
}
module.exports = new AdminController();
