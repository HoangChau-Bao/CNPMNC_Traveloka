const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const sqlcheck = require('../../util/sqlschedule');

class AdminController {
  //[GET] /admin/vouchermanage
  vouchermanage(req, res) {
    //res.render('admin/vouchermanage');

    // if (req.isAuthenticated()) {
    //   if (req.user.ChucVu == true) {
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
    //   } else {
    //     res.redirect('/');
    //   }
    // } else {
    //   res.redirect('/');
    // }
  }

  //[POST] /admin/vouchermanage/changestatus
  changestatus(req, res) {
    console.log(req.body);
    sql.connect(config, (err, result) => {
      let str =
        "UPDATE Voucher SET Status = 'false' WHERE _id= " + req.body._id + ';';
      let str2 =
        "UPDATE Voucher SET Status = 'true' WHERE _id= " + req.body._id + ';';
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

  //[GET] /admin/usermanage
  usermanage(req, res) {
    // if (req.isAuthenticated()) {
    //   if (req.user.ChucVu == true) {
    sql.connect(config, (err, result) => {
      let str = 'SELECT * FROM NguoiDung';
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
            res.render('admin/usermanage', {
              user: result.recordset,
            });
            //res.json(result);
          }
        });
      }
    });
    //   } else {
    //     res.redirect('/');
    //   }
    // } else {
    //   res.redirect('/');
    // }
  }

  //[GET] /admin/usermanager/adduser
  adduser(req, res) {
    res.render('admin/adduser');
  }

  //[POST] /admin/usermanager/adduserstore
  adduserstore(req, res) {
    //res.render('user/register',{ messages: 'nonono'});

    sql.connect(config, (err, result) => {
      let taikhoan = req.body.TaiKhoan;
      let matkhau = req.body.MatKhau;
      let hoten = req.body.Hoten;
      let sdt = req.body.SoDienThoai;
      let diachi = req.body.DiaChi;
      let chucvu = req.body.ChucVu;

      let str1 = "SELECT * FROM NguoiDung Where TaiKhoan='" + taikhoan + "'"; //query kiểm tra tài khoản có trùng không;

      let str2 = "SELECT * FROM NguoiDung Where SoDienThoai='" + sdt + "'"; //query kiểm tra số điện thoại đã tồn tại chưa;

      let str3 =
        'INSERT INTO NguoiDung (TaiKhoan, MatKhau, HoTen, SoDienThoai, DiaChi, ChucVu) ' +
        "VALUES ('" +
        taikhoan +
        "', '" +
        matkhau +
        "', N'" +
        hoten +
        "', '" +
        sdt +
        "', N'" +
        diachi +
        "', '" +
        chucvu +
        "');";

      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str1, function (err, result) {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            if (result.recordset[0]) {
              res.render('admin/adduser', {
                messages: 'Tài khoản đã được sử dụng !!!',
              });
            } else {
              request.query(str2, function (err, result) {
                if (err) {
                  console.log('ERROR ' + err);
                  throw err;
                } else {
                  if (result.recordset[0]) {
                    res.render('admin/adduser', {
                      messages: 'Số điện thoại đã được sử dụng !!!',
                    });
                  } else {
                    request.query(str3, function (err, result) {
                      if (err) {
                        console.log('ERROR ' + err);
                        throw err;
                      } else {
                        res.redirect('/admin/usermanage');
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
    });
  }

  changestatususer(req, res) {
    sql.connect(config, (err, result) => {
      let str =
        "UPDATE NguoiDung SET Status = 'false' WHERE TaiKhoan= '" +
        req.body.TaiKhoan +
        "';";
      let str2 =
        "UPDATE NguoiDung SET Status = 'true' WHERE TaiKhoan= '" +
        req.body.TaiKhoan +
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
              res.redirect('/admin/usermanage');
            }
          });
        } else {
          request.query(str2, function (err, result) {
            if (err) {
              console.log('ERROR ' + err);
              throw err;
            } else {
              res.redirect('/admin/usermanage');
            }
          });
        }
      }
    });
  }
}
module.exports = new AdminController();
