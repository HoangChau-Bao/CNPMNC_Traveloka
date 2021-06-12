const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const sqlcheck = require('../../util/sqlschedule');
const requestt = require('request');

class AdminController {
  //[GET] /admin/vouchermanage
  vouchermanage(req, res) {
    //res.render('admin/vouchermanage');

    if (req.isAuthenticated()) {
      if (req.user.auth[0].note == 'adminvoucher') {
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
    //console.log(req.body);
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
    if (req.isAuthenticated()) {
      if (req.user.auth[0].note == 'adminvoucher') {
        // sql.connect(config, (err, result) => {
        //   let str = 'SELECT * FROM NguoiDung';
        //   let request = new sql.Request();
        //   if (err) {
        //     console.log('Error while querying database :- ' + err);
        //     throw err;
        //   } else {
        //     request.query(str, function (err, result) {
        //       if (err) {
        //         console.log('ERROR ' + err);
        //         throw err;
        //       } else {
        //         res.render('admin/usermanage', {
        //           user: result.recordset,
        //         });
        //         //res.json(result);
        //       }
        //     });
        //   }
        // });
        requestt(
          'https://oka1kh.azurewebsites.net/api/users',
          function (error, result) {
            console.error('error:', error);
            console.log('statusCode:', result && result.statusCode);
            let x = JSON.parse(result.body);
            //console.log(x);
            res.render('admin/usermanage', { user: x.Users });
          },
        );
      } else {
        res.redirect('/');
      }
    } else {
      res.redirect('/');
    }
  }

  //[GET] /admin/usermanager/adduser
  adduser(req, res) {
    res.render('admin/adduser');
  }

  //[POST] /admin/usermanager/adduserstore
  adduserstore(req, res) {
    //res.render('user/register',{ messages: 'nonono'});

    // sql.connect(config, (err, result) => {
    //   let taikhoan = req.body.TaiKhoan;
    //   let matkhau = req.body.MatKhau;
    //   let ho = req.body.Ho;
    //   let ten = req.body.Ten;
    //   let sdt = req.body.SoDienThoai;
    //   let diachi = req.body.DiaChi;
    //   let chucvu = req.body.ChucVu;
    //   if(chucvu == true) {
    //     let partnerid = 'adminvoucher';
    //   }
    //   else {
    //     let partnerid = req.body.PartnerID;
    //   }

    //   let str1 = "SELECT * FROM NguoiDung Where TaiKhoan='" + taikhoan + "'"; //query kiểm tra tài khoản có trùng không;

    //   let str2 = "SELECT * FROM NguoiDung Where SoDienThoai='" + sdt + "'"; //query kiểm tra số điện thoại đã tồn tại chưa;

    //   let str3 =
    //     'INSERT INTO NguoiDung (TaiKhoan, MatKhau, HoTen, SoDienThoai, DiaChi, ChucVu, PartnerID) ' +
    //     "VALUES ('" +
    //     taikhoan +
    //     "', '" +
    //     matkhau +
    //     "', N'" +
    //     hoten +
    //     "', '" +
    //     sdt +
    //     "', N'" +
    //     diachi +
    //     "', '" +
    //     chucvu +
    //     "', '" +
    //     partnerid +
    //     "');";

    //   let request = new sql.Request();
    //   if (err) {
    //     console.log('Error while querying database :- ' + err);
    //     throw err;
    //   } else {
    //     request.query(str1, function (err, result) {
    //       if (err) {
    //         console.log('ERROR ' + err);
    //         throw err;
    //       } else {
    //         if (result.recordset[0]) {
    //           res.render('admin/adduser', {
    //             messages: 'Tài khoản đã được sử dụng !!!',
    //           });
    //         } else {
    //           request.query(str2, function (err, result) {
    //             if (err) {
    //               console.log('ERROR ' + err);
    //               throw err;
    //             } else {
    //               if (result.recordset[0]) {
    //                 res.render('admin/adduser', {
    //                   messages: 'Số điện thoại đã được sử dụng !!!',
    //                 });
    //               } else {
    //                 request.query(str3, function (err, result) {
    //                   if (err) {
    //                     console.log('ERROR ' + err);
    //                     throw err;
    //                   } else {
    //                     res.redirect('/admin/usermanage');
    //                   }
    //                 });
    //               }
    //             }
    //           });
    //         }
    //       }
    //     });
    //   }
    // });

    // tich hop profile
    let taikhoan = req.body.TaiKhoan;
    let matkhau = req.body.MatKhau;
    let ho = req.body.Ho;
    let ten = req.body.Ten;
    let sdt = req.body.SoDienThoai;
    let diachi = req.body.DiaChi;
    let chucvu = req.body.ChucVu;
    let partnerid;
    console.log(req.body);
    if (chucvu == 'true') {
      partnerid = 'adminvoucher';
    } else {
      partnerid = req.body.PartnerID;
    }
    requestt.post(
      {
        url: 'https://oka1kh.azurewebsites.net/api/user',
        json: { email: taikhoan, pass: matkhau },
      },
      function (err, httpResponse, body) {
        if (err) throw err;
        console.log(body);
        console.log(httpResponse.statusCode);
        if (httpResponse.statusCode == 401)
          res.render('admin/adduser', {
            messages: 'Tài khoản đã được sử dụng !',
          });
        else if (httpResponse.statusCode == 200) {
          console.log(body);
          let userid = body.created[0].userId;
          requestt.patch(
            {
              url:
                'https://oka1kh.azurewebsites.net/api/user/change_name/' +
                userid +
                '',
              json: { fristName: ho, lastName: ten },
            },
            function (err, httpResponse, body) {
              if (err) res.statusCode(400).send(err);
              else {
                requestt.patch(
                  {
                    url:
                      'https://oka1kh.azurewebsites.net/api/user/change_phone/' +
                      userid +
                      '',
                    json: { phone: sdt },
                  },
                  function (err, httpResponse, body) {
                    if (err) res.statusCode(400).send(err);
                    else {
                      requestt.post(
                        {
                          url:
                            'https://oka1kh.azurewebsites.net/api/user/update_note/' +
                            taikhoan +
                            '',
                          json: { note: partnerid },
                        },
                        function (err, httpResponse, body) {
                          if (err) res.statusCode(400).send(err);
                          else {
                            requestt.post(
                              {
                                url:
                                  'https://oka1kh.azurewebsites.net/api/user/update_address/' +
                                  taikhoan +
                                  '',
                                json: { userAddress: diachi },
                              },
                              function (err, httpResponse, body) {
                                if (err) res.statusCode(400).send(err);
                                else {
                                  res.redirect('/admin/usermanage');
                                }
                              },
                            );
                          }
                        },
                      );
                    }
                  },
                );
              }
            },
          );
        }
      },
    );
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

  deleteuser(req, res) {
    let userid = req.body.userId;
    console.log('delete');
    requestt.delete({
      url: 'https://oka1kh.azurewebsites.net/api/user/' + userid + '',
      function(err, httpResponse, body) {
        if (err) res.send(err);
        if (httpResponse.statusCode == 200) {
          console.log()(body);
          console.log('Deleted!');
          res.redirect('/admin/usermanage');
        } else res.redirect('/admin/usermanage');
      },
    });
  }
}
module.exports = new AdminController();
