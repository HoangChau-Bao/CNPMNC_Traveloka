const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const request = require('request');
const { user } = require('../../config/db/dbconfig');
const { renderSync } = require('node-sass');
const { json } = require('express');

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
    // sql.connect(config, (err, result) => {
    //   let taikhoan = req.user.TaiKhoan;
    //   let str = "SELECT * FROM NguoiDung Where TaiKhoan='" + taikhoan + "'";
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
    //         if (req.user.PartnerID == 'user')
    //           res.render('user/profile', { user: result.recordset });
    //         else res.render('user/profilepartner', { user: result.recordset });
    //         //res.json(result);
    //       }
    //     });
    //   }
    // });

    // tich hop profile
    //console.log(req.user.auth[0].email);
    //res.render('user/profile', { user: req.user.auth });
    let taikhoan = req.user.auth[0].email;
    request.get(
      {
        url:
          'https://oka1kh.azurewebsites.net/api/userbyemail/' + taikhoan + '',
      },
      function (error, result) {
        if (result.statusCode == 200) {
          let x = JSON.parse(result.body);
          console.log(x.user[0].note);
          if (x.user[0].note == null)
            res.render('user/profile', { user: x.user });
          else res.render('user/profilepartner', { user: x.user });
        } else res.statusCode(400).send(error);
      },
    );
  }

  //[POST] /user/profileupdate
  profileupdate(req, res) {
    // sql.connect(config, (err, result) => {
    //   let taikhoan = req.body.TaiKhoan;
    //   let hoten = req.body.HoTen;
    //   let sdt = req.body.SoDienThoai;
    //   let diachi = req.body.DiaChi;
    //   let str =
    //     "UPDATE NguoiDung SET HoTen = N'" +
    //     hoten +
    //     "', SoDienThoai = '" +
    //     sdt +
    //     "', DiaChi = N'" +
    //     diachi +
    //     "' WHERE TaiKhoan = '" +
    //     taikhoan +
    //     "';";
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
    //         res.redirect('/user/profile');
    //       }
    //     });
    //   }
    // });

    //tich hop profile
    //console.log(req.user.auth[0]);
    let id = req.user.auth[0].userId;
    let taikhoan = req.body.TaiKhoan;
    let ho = req.body.Ho;
    let ten = req.body.Ten;
    let sdt = req.body.SoDienThoai;
    let diachi = req.body.DiaChi;

    request.patch(
      {
        url: 'https://oka1kh.azurewebsites.net/api/user/change_name/' + id + '',
        json: { fristName: ho, lastName: ten },
      },
      function (err, httpResponse1, body1) {
        if (err) throw err;
        if (httpResponse1.statusCode == 200) {
          request.patch(
            {
              url:
                'https://oka1kh.azurewebsites.net/api/user/change_phone/' +
                id +
                '',
              json: { phone: sdt },
            },
            function (err2, httpResponse2, body2) {
              if (err) throw err;
              else if (httpResponse2.statusCode == 200) {
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
                      res.redirect('back');
                    }
                  },
                );
              } else res.status(400).send(err2);
            },
          );
        } else res.status(400).send(err);
      },
    );
  }

  //[POST] /user/register
  registerstore(req, res) {
    //res.render('user/register',{ messages: 'nonono'});

    //   sql.connect(config, (err, result) => {
    //   let taikhoan = req.body.TaiKhoan;
    //   let matkhau = req.body.MatKhau;
    //   let hoten = req.body.Hoten;
    //   let sdt = req.body.SoDienThoai;
    //   let diachi = req.body.DiaChi;

    //   let str1 = "SELECT * FROM NguoiDung Where TaiKhoan='" + taikhoan + "'"; //query kiểm tra tài khoản có trùng không;

    //   let str2 = "SELECT * FROM NguoiDung Where SoDienThoai='" + sdt + "'"; //query kiểm tra số điện thoại đã tồn tại chưa;

    //   let str3 =
    //     'INSERT INTO NguoiDung (TaiKhoan, MatKhau, HoTen, SoDienThoai, DiaChi, PartnerID) ' +
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
    //     "', 'user');";

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
    //           res.render('user/register', {
    //             messages: 'Tài khoản đã được sử dụng !!!',
    //           });
    //         } else {
    //           request.query(str2, function (err, result) {
    //             if (err) {
    //               console.log('ERROR ' + err);
    //               throw err;
    //             } else {
    //               if (result.recordset[0]) {
    //                 res.render('user/register', {
    //                   messages: 'Số điện thoại đã được sử dụng !!!',
    //                 });
    //               } else {
    //                 request.query(str3, function (err, result) {
    //                   if (err) {
    //                     console.log('ERROR ' + err);
    //                     throw err;
    //                   } else {
    //                     res.redirect('/user/login');
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

    //tich hop profile còn thiếu
    let taikhoan = req.body.TaiKhoan;
    let matkhau = req.body.MatKhau;
    let ho = req.body.Ho;
    let ten = req.body.Ten;
    let sdt = req.body.SoDienThoai;
    let diachi = req.body.DiaChi;
    let userid;
    request.post(
      {
        url: 'https://oka1kh.azurewebsites.net/api/user',
        json: { email: taikhoan, pass: matkhau },
      },
      function (err, httpResponse, body) {
        if (err) throw err;
        console.log(body);
        console.log(httpResponse.statusCode);
        if (httpResponse.statusCode == 401)
          res.render('user/register', {
            messages: 'Tài khoản đã được sử dụng !',
          });
        else if (httpResponse.statusCode == 200) {
          userid = body.created[0].userId;
          request.patch(
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
                request.patch(
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
                            'https://oka1kh.azurewebsites.net/api/user/update_address/' +
                            taikhoan +
                            '',
                          json: { userAddress: diachi },
                        },
                        function (err, httpResponse, body) {
                          if (err) res.statusCode(400).send(err);
                          else {
                            res.redirect('/user/login');
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

  //[GET]  /user/voucherwarehouse
  voucherwarehouse(req, res) {
    sql.connect(config, (err, result) => {
      //let taikhoan = req.user.TaiKhoan;

      let taikhoan = req.user.auth[0].email;
      console.log('email: ', req.user.auth[0].email);
      let str =
        "SELECT * FROM CTVoucher Where TaiKhoan='" +
        taikhoan +
        "' AND Status = 1";
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
            res.render('user/voucherwarehouse', { vouchers: result.recordset });
            //res.json(result);
          }
        });
      }
    });
  }

  //[POST] /user/buyvoucher
  buyvoucher(req, res) {
    //res.json(req.user);
    // sql.connect(config, (err, result) => {
    //   let taikhoan = req.user.TaiKhoan;
    //   let voucherid = req.body._id;
    //   let catalogid = req.body.CatalogID;
    //   let tenvoucher = req.body.Name;
    //   let code = req.body.Code;
    //   let slug = req.body.slug;
    //   let imagelink = req.body.ImageLink;
    //   let pointcost = req.body.PointCost;

    //   //console.log(parseInt(req.user.DiemHienTai,10) - parseInt(pointcost,10));

    //   if (parseInt(req.user.DiemHienTai, 10) - parseInt(pointcost, 10) >= 0) {
    //     let str =
    //       'INSERT INTO CTVoucher (Voucher_id, TaiKhoan, Code, CatalogID, TenVoucher, voucherslug, ImageLink)' +
    //       " VALUES ('" +
    //       voucherid +
    //       "', '" +
    //       taikhoan +
    //       "', '" +
    //       code +
    //       "', '" +
    //       catalogid +
    //       "', N'" +
    //       tenvoucher +
    //       "', '" +
    //       slug +
    //       "', '" +
    //       imagelink +
    //       "');";
    //     let request = new sql.Request();
    //     if (err) {
    //       console.log('Error while querying database :- ' + err);
    //       throw err;
    //     } else {
    //       request.query(str, function (err, result) {
    //         if (err) {
    //           console.log('ERROR ' + err);
    //           throw err;
    //         } else {
    //           let x =
    //             parseInt(req.user.DiemHienTai, 10) - parseInt(pointcost, 10);
    //           let str =
    //             "UPDATE NguoiDung SET DiemHienTai = '" +
    //             x +
    //             "' WHERE TaiKhoan = '" +
    //             req.user.TaiKhoan +
    //             "';";
    //           let request = new sql.Request();
    //           request.query(str, function (err, result) {
    //             if (err) {
    //               console.log('ERROR ' + err);
    //               throw err;
    //             } else {
    //               let str =
    //                 "SELECT Quantity FROM Voucher WHERE _id = '" +
    //                 voucherid +
    //                 "'";
    //               let request = new sql.Request();
    //               request.query(str, function (err, result) {
    //                 if (err) {
    //                   console.log('ERROR ' + err);
    //                   throw err;
    //                 } else {
    //                   let x = parseInt(result.recordset[0].Quantity, 10) - 1;
    //                   let str =
    //                     "UPDATE Voucher SET Quantity = '" +
    //                     x +
    //                     "' WHERE _id = '" +
    //                     voucherid +
    //                     "';";
    //                   let request = new sql.Request();
    //                   request.query(str, function (err, result) {
    //                     if (err) {
    //                       console.log('ERROR ' + err);
    //                       throw err;
    //                     } else {
    //                       req.flash('thongbao', 'Mua voucher thành công');
    //                       res.locals.thongbao = req.flash('thongbao');
    //                       res.redirect('/');
    //                     }
    //                   });
    //                 }
    //               });
    //             }
    //           });
    //         }
    //       });
    //     }
    //   } else {
    //     req.flash('thongbao', 'Bạn không đủ điểm để mua voucher');
    //     res.locals.thongbao = req.flash('thongbao');
    //     res.redirect('/vouchers/' + slug);
    //   }
    // });

    //Tich hop profile

    let taikhoan = req.user.auth[0].email;
    let voucherid = req.body._id;
    let catalogid = req.body.CatalogID;
    let tenvoucher = req.body.Name;
    let code = req.body.Code;
    let slug = req.body.slug;
    let imagelink = req.body.ImageLink;
    let pointcost = req.body.PointCost;
    let expdate = req.body.ExpDate;

    request.get(
      {
        url:
          'https://oka1kh.azurewebsites.net/api/userbyemail/' + taikhoan + '',
      },
      function (error, result) {
        if (result.body != 'not found') {
          let x = JSON.parse(result.body);
          let point = x.user[0].value_TotalPoint;
          let negpointcost = pointcost * -1;
          let id = x.user[0].userId;

          console.log(point, taikhoan);
          sql.connect(config, (err, result) => {
            //console.log(parseInt(req.user.DiemHienTai,10) - parseInt(pointcost,10));

            if (point - parseInt(pointcost, 10) >= 0) {
              let str =
                'INSERT INTO CTVoucher (Voucher_id, TaiKhoan, Code, CatalogID, TenVoucher, voucherslug, ImageLink, ExpDate)' +
                " VALUES ('" +
                voucherid +
                "', '" +
                taikhoan +
                "', '" +
                code +
                "', '" +
                catalogid +
                "', N'" +
                tenvoucher +
                "', '" +
                slug +
                "', '" +
                imagelink +
                "', '" +
                expdate +
                "');";
              let requestsql = new sql.Request();
              if (err) {
                res.statusCode(400).send(err);
              } else {
                requestsql.query(str, function (err, result) {
                  if (err) {
                    res.statusCode(400).send(err);
                  } else {
                    request.post(
                      {
                        url:
                          'https://oka1kh.azurewebsites.net/api/user/update_point/' +
                          id +
                          '',
                        json: { point: negpointcost },
                      },
                      function (err, httpResponse, body) {
                        if (err) {
                          res.statusCode(400).send(err);
                        } else {
                          let str =
                            "SELECT Quantity FROM Voucher WHERE _id = '" +
                            voucherid +
                            "'";
                          let request = new sql.Request();
                          request.query(str, function (err, result) {
                            if (err) {
                              res.statusCode(400).send(err);
                            } else {
                              let quan =
                                parseInt(result.recordset[0].Quantity, 10) - 1;
                              let str =
                                "UPDATE Voucher SET Quantity = '" +
                                quan +
                                "' WHERE _id = '" +
                                voucherid +
                                "';";
                              let request = new sql.Request();
                              request.query(str, function (err, result) {
                                if (err) {
                                  console.log('ERROR ' + err);
                                  throw err;
                                } else {
                                  req.flash(
                                    'thongbao',
                                    'Mua voucher thành công',
                                  );
                                  res.locals.thongbao = req.flash('thongbao');
                                  res.redirect('/');
                                }
                              });
                            }
                          });
                        }
                      },
                    );
                  }
                });
              }
            } else {
              req.flash('thongbao', 'Bạn không đủ điểm để mua voucher');
              res.locals.thongbao = req.flash('thongbao');
              res.redirect('back');
            }
          });
        } else {
          res.redirect('back');
        }
      },
    );
  }
}
module.exports = new UserController();
