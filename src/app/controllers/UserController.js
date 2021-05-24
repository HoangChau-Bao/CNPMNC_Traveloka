const config = require('../../config/db/dbconfig');
const sql = require('mssql');

class UserController {
  //[GET] /user/login
  login(req, res) {
    res.render('user/login');
  }

  //[GET] /user/register
  register(req, res) {
    res.render('user/register');
  }

  //[GET] /user/test
  test(req, res) {
    res.send(req.user);
  }

  //[GET] /user/logout
  logout(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  }

  //[GET] /user/profile
  profile(req, res) {
    sql.connect(config, (err, result) => {
      let taikhoan = req.user.TaiKhoan;
      let str = "SELECT * FROM NguoiDung Where TaiKhoan='" + taikhoan + "'";
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
            res.render('user/profile', { user: result.recordset });
            //res.json(result);
          }
        });
      }
    });
  }

  //[POST] /user/register
  registerstore(req, res) {
    //res.render('user/register',{ messages: 'nonono'});

    sql.connect(config, (err, result) => {
      let taikhoan = req.body.TaiKhoan;
      let matkhau = req.body.MatKhau;
      let hoten = req.body.Hoten;
      let sdt = req.body.SoDienThoai;
      let diachi = req.body.DiaChi;

      let str1 = "SELECT * FROM NguoiDung Where TaiKhoan='" + taikhoan + "'"; //query kiểm tra tài khoản có trùng không;

      let str2 = "SELECT * FROM NguoiDung Where SoDienThoai='" + sdt + "'"; //query kiểm tra số điện thoại đã tồn tại chưa;

      let str3 =
        'INSERT INTO NguoiDung (TaiKhoan, MatKhau, HoTen, SoDienThoai, DiaChi) ' +
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
              res.render('user/register', {
                messages: 'Tài khoản đã được sử dụng !!!',
              });
            } else {
              request.query(str2, function (err, result) {
                if (err) {
                  console.log('ERROR ' + err);
                  throw err;
                } else {
                  if (result.recordset[0]) {
                    res.render('user/register', {
                      messages: 'Số điện thoại đã được sử dụng !!!',
                    });
                  } else {
                    request.query(str3, function (err, result) {
                      if (err) {
                        console.log('ERROR ' + err);
                        throw err;
                      } else {
                        res.redirect('/user/login');
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
}
module.exports = new UserController();
