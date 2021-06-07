const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const tools = require('../../util/tools');

class ApiController {
  test(req, res) {
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
  }

  //[GET] /api/GetrVouchersByID
  GetVoucherByID(req, res) {
    sql.connect(config, (err, result) => {
      let str = "SELECT * FROM Voucher WHERE _id = '" + req.query._id + "'";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            if (result.recordset.length != 0) {
              res.status(200);
              res.json(result);
            } else {
              res.status(400);
              res.send('Không có Voucher với _id này !');
            }
          }
        });
      }
    });
  }

  //[GET] /api/GetVoucherByPartnerID
  GetVouchersByPartnerID(req, res) {
    //res.send(req.query.PartnerID);

    sql.connect(config, (err, result) => {
      let str =
        "SELECT * FROM Voucher WHERE PartnerID = '" + req.query.PartnerID + "'";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            res.status(200);
            res.json(result);
          }
        });
      }
    });
  }

  //[GET] /api/GetAllVoucherNguoiDung
  GetAllVoucherNguoiDung(req, res) {
    sql.connect(config, (err, result) => {
      let str = 'SELECT * FROM CTVoucher';
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            //   res.render('admin/vouchermanage', {
            //     vouchers: result.recordset,
            //   });
            res.json(result);
          }
        });
      }
    });
  }

  GetVouchersByTaiKhoan(req, res) {
    sql.connect(config, (err, result) => {
      let str =
        "SELECT * FROM CTVoucher WHERE TaiKhoan = '" + req.query.TaiKhoan + "'";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            res.json(result);
          }
        });
      }
    });
  }

  //[GET] /api/GetAllVoucherKhachSan
  GetAllVoucherKhachSan(req, res) {
    sql.connect(config, (err, result) => {
      let str = "SELECT * FROM Voucher WHERE CatalogID = 'khachSan'";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            //   res.render('admin/vouchermanage', {
            //     vouchers: result.recordset,
            //   });
            res.json(result);
          }
        });
      }
    });
  }

  //[GET] /api/GetAllVoucherThueXe
  GetAllVoucherThueXe(req, res) {
    sql.connect(config, (err, result) => {
      let str = "SELECT * FROM Voucher WHERE CatalogID = 'thueXe'";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            res.json(result);
          }
        });
      }
    });
  }

  //[GET] /api/GetAllVoucherVeMayBay
  GetAllVoucherVeMayBay(req, res) {
    sql.connect(config, (err, result) => {
      let str = "SELECT * FROM Voucher WHERE CatalogID = 'veMayBay'";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            res.json(result);
          }
        });
      }
    });
  }

  //[GET] /api/GetAllVoucherCanHoBietThu
  GetAllVoucherCanHoBietThu(req, res) {
    sql.connect(config, (err, result) => {
      let str = "SELECT * FROM Voucher WHERE CatalogID = 'canHoBietThu'";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            res.json(result);
          }
        });
      }
    });
  }

  //[GET] /api/GetAllVoucherTourDuLich
  GetAllVoucherTourDuLich(req, res) {
    sql.connect(config, (err, result) => {
      let str = "SELECT * FROM Voucher WHERE CatalogID = 'tourDuLich'";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            res.json(result);
          }
        });
      }
    });
  }

  //[GET] /api/GetAllVoucherDuaDonSanBay
  GetAllVoucherDuaDonSanBay(req, res) {
    sql.connect(config, (err, result) => {
      let str = "SELECT * FROM Voucher WHERE CatalogID = 'duaDonSanBay'";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            res.json(result);
          }
        });
      }
    });
  }

  //[GET] /api/GetAllVoucher
  GetAllVoucher(req, res) {
    sql.connect(config, (err, result) => {
      let str = 'SELECT * FROM Voucher';
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            res.json(result);
          }
        });
      }
    });
  }

  //[GET] /api/GetAllUser
  GetAllUser(req, res) {
    sql.connect(config, (err, result) => {
      let str = 'SELECT * FROM NguoiDung WHERE ChucVu= 0 ';
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            res.json(result);
          }
        });
      }
    });
  }

  // [POST] /api/CreateVoucherKhachSan  *đã test
  createVoucherKhachSan(req, res) {
    //res.send(req.body);
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(400);
      res.send('Ngày hết hạn phải lớn hơn ngày bắt đầu');
    } else {
      let sampleFile = req.files.ImageLink;
      let uploadPath =
        '/src/public/img/' + req.body.CreateDate + sampleFile.name;
      sampleFile.mv(uploadPath, (err) => {
        if (err) {
          res.status(400);
          res.send(err);
        }
      });

      sql.connect(config, (err, result) => {
        let request = new sql.Request();
        if (err) {
          res.status(400);
          res.send('Error while querying database :- ' + err);
        } else {
          let request = new sql.Request();

          let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;

          let slug = tools.toslug(req.body.Name);
          let code = tools.randomcode();
          let CreateDate = req.body.CreateDate;
          let ExpDate = req.body.ExpDate;
          let str =
            'INSERT INTO Voucher (VoucherID,CatalogID,Name,PointCost,Discount,PartnerID,Quantity,Code,ImageLink,ContentHeader,PreContent,Contents,VoucherNote,slug,CreateDate,ExpDate,MoneyDiscount) ' +
            "VALUES (N'" +
            req.body.PartnerID +
            req.body.Name +
            "', N'khachSan', N'" +
            req.body.Name +
            "', " +
            req.body.PointCost +
            ', ' +
            req.body.Discount +
            ", '" +
            req.body.PartnerID +
            "', " +
            req.body.Quantity +
            ", N'" +
            code +
            "', '" +
            ImagePath +
            "', N'" +
            req.body.ContentHeader +
            "', N'" +
            req.body.PreContent +
            "', N'" +
            req.body.Contents +
            "', N'" +
            req.body.VoucherNote +
            "', '" +
            slug +
            "', '" +
            CreateDate +
            "', '" +
            ExpDate +
            "', '" +
            req.body.MoneyDiscount +
            "');";
          request.query(str, (err, result) => {
            if (err) {
              res.status(400);
              res.send(err);
            } else res.status(201);
            res.send('Tạo thành công !');
          });
        }
      });
    }
  }

  // [POST] /api/CreateVoucherThueXe  *đã test
  createVoucherThueXe(req, res) {
    //res.send(req.body);
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(400);
      res.send('Ngày hết hạn phải lớn hơn ngày bắt đầu');
    } else {
      let sampleFile = req.files.ImageLink;
      let uploadPath =
        'src/public/img/' + req.body.CreateDate + sampleFile.name;
      sampleFile.mv(uploadPath, (err) => {
        if (err) {
          res.status(400);
          res.send(err);
        }
      });

      sql.connect(config, (err, result) => {
        let request = new sql.Request();
        if (err) {
          res.status(400);
          res.send('Error while querying database :- ' + err);
        } else {
          let request = new sql.Request();

          let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;

          let slug = tools.toslug(req.body.Name);
          let code = tools.randomcode();
          let CreateDate = req.body.CreateDate;
          let ExpDate = req.body.ExpDate;
          let str =
            'INSERT INTO Voucher (VoucherID,CatalogID,Name,PointCost,Discount,PartnerID,Quantity,Code,ImageLink,ContentHeader,PreContent,Contents,VoucherNote,slug,CreateDate,ExpDate,MoneyDiscount) ' +
            "VALUES (N'" +
            req.body.PartnerID +
            req.body.Name +
            "', N'thueXe', N'" +
            req.body.Name +
            "', " +
            req.body.PointCost +
            ', ' +
            req.body.Discount +
            ", '" +
            req.body.PartnerID +
            "', " +
            req.body.Quantity +
            ", N'" +
            code +
            "', '" +
            ImagePath +
            "', N'" +
            req.body.ContentHeader +
            "', N'" +
            req.body.PreContent +
            "', N'" +
            req.body.Contents +
            "', N'" +
            req.body.VoucherNote +
            "', '" +
            slug +
            "', '" +
            CreateDate +
            "', '" +
            ExpDate +
            "', '" +
            req.body.MoneyDiscount +
            "');";
          request.query(str, (err, result) => {
            if (err) {
              res.status(400);
              res.send(err);
            } else res.status(201);
            res.send('Tạo thành công !');
          });
        }
      });
    }
  }

  // [POST] /api/CreateVoucherVeMayBay  *đã test
  createVoucherVeMayBay(req, res) {
    //res.send(req.body);
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(400);
      res.send('Ngày hết hạn phải lớn hơn ngày bắt đầu');
    } else {
      let sampleFile = req.files.ImageLink;
      let uploadPath =
        'src/public/img/' + req.body.CreateDate + sampleFile.name;
      sampleFile.mv(uploadPath, (err) => {
        if (err) {
          res.status(400);
          res.send(err);
        }
      });

      sql.connect(config, (err, result) => {
        let request = new sql.Request();
        if (err) {
          res.status(400);
          res.send('Error while querying database :- ' + err);
        } else {
          let request = new sql.Request();

          let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;

          let slug = tools.toslug(req.body.Name);
          let code = tools.randomcode();
          let CreateDate = req.body.CreateDate;
          let ExpDate = req.body.ExpDate;
          let str =
            'INSERT INTO Voucher (VoucherID,CatalogID,Name,PointCost,Discount,PartnerID,Quantity,Code,ImageLink,ContentHeader,PreContent,Contents,VoucherNote,slug,CreateDate,ExpDate,MoneyDiscount) ' +
            "VALUES (N'" +
            req.body.PartnerID +
            req.body.Name +
            "', N'veMayBay', N'" +
            req.body.Name +
            "', " +
            req.body.PointCost +
            ', ' +
            req.body.Discount +
            ", '" +
            req.body.PartnerID +
            "', " +
            req.body.Quantity +
            ", N'" +
            code +
            "', '" +
            ImagePath +
            "', N'" +
            req.body.ContentHeader +
            "', N'" +
            req.body.PreContent +
            "', N'" +
            req.body.Contents +
            "', N'" +
            req.body.VoucherNote +
            "', '" +
            slug +
            "', '" +
            CreateDate +
            "', '" +
            ExpDate +
            "', '" +
            req.body.MoneyDiscount +
            "');";
          request.query(str, (err, result) => {
            if (err) {
              res.status(400);
              res.send(err);
            } else res.status(201);
            res.send('Tạo thành công !');
          });
        }
      });
    }
  }

  // [POST] /api/CreateVoucherCanHoBietThu  *đã test
  createVoucherCanHoBietThu(req, res) {
    //res.send(req.body);
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(400);
      res.send('Ngày hết hạn phải lớn hơn ngày bắt đầu');
    } else {
      let sampleFile = req.files.ImageLink;
      let uploadPath =
        'src/public/img/' + req.body.CreateDate + sampleFile.name;
      sampleFile.mv(uploadPath, (err) => {
        if (err) {
          res.status(400);
          res.send(err);
        }
      });

      sql.connect(config, (err, result) => {
        let request = new sql.Request();
        if (err) {
          res.status(400);
          res.send('Error while querying database :- ' + err);
        } else {
          let request = new sql.Request();

          let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;

          let slug = tools.toslug(req.body.Name);
          let code = tools.randomcode();
          let CreateDate = req.body.CreateDate;
          let ExpDate = req.body.ExpDate;
          let str =
            'INSERT INTO Voucher (VoucherID,CatalogID,Name,PointCost,Discount,PartnerID,Quantity,Code,ImageLink,ContentHeader,PreContent,Contents,VoucherNote,slug,CreateDate,ExpDate,MoneyDiscount) ' +
            "VALUES (N'" +
            req.body.PartnerID +
            req.body.Name +
            "', N'canHoBietThu', N'" +
            req.body.Name +
            "', " +
            req.body.PointCost +
            ', ' +
            req.body.Discount +
            ", '" +
            req.body.PartnerID +
            "', " +
            req.body.Quantity +
            ", N'" +
            code +
            "', '" +
            ImagePath +
            "', N'" +
            req.body.ContentHeader +
            "', N'" +
            req.body.PreContent +
            "', N'" +
            req.body.Contents +
            "', N'" +
            req.body.VoucherNote +
            "', '" +
            slug +
            "', '" +
            CreateDate +
            "', '" +
            ExpDate +
            "', '" +
            req.body.MoneyDiscount +
            "');";
          request.query(str, (err, result) => {
            if (err) {
              res.status(400);
              res.send(err);
            } else res.status(201);
            res.send('Tạo thành công !');
          });
        }
      });
    }
  }

  // [POST] /api/CreateVoucherTourDuLich  *đã test
  createVoucherTourDuLich(req, res) {
    //res.send(req.body);
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(400);
      res.send('Ngày hết hạn phải lớn hơn ngày bắt đầu');
    } else {
      let sampleFile = req.files.ImageLink;
      let uploadPath =
        'src/public/img/' + req.body.CreateDate + sampleFile.name;
      sampleFile.mv(uploadPath, (err) => {
        if (err) {
          res.status(400);
          res.send(err);
        }
      });

      sql.connect(config, (err, result) => {
        let request = new sql.Request();
        if (err) {
          res.status(400);
          res.send('Error while querying database :- ' + err);
        } else {
          let request = new sql.Request();

          let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;

          let slug = tools.toslug(req.body.Name);
          let code = tools.randomcode();
          let CreateDate = req.body.CreateDate;
          let ExpDate = req.body.ExpDate;
          let str =
            'INSERT INTO Voucher (VoucherID,CatalogID,Name,PointCost,Discount,PartnerID,Quantity,Code,ImageLink,ContentHeader,PreContent,Contents,VoucherNote,slug,CreateDate,ExpDate,MoneyDiscount) ' +
            "VALUES (N'" +
            req.body.PartnerID +
            req.body.Name +
            "', N'tourDuLich', N'" +
            req.body.Name +
            "', " +
            req.body.PointCost +
            ', ' +
            req.body.Discount +
            ", '" +
            req.body.PartnerID +
            "', " +
            req.body.Quantity +
            ", N'" +
            code +
            "', '" +
            ImagePath +
            "', N'" +
            req.body.ContentHeader +
            "', N'" +
            req.body.PreContent +
            "', N'" +
            req.body.Contents +
            "', N'" +
            req.body.VoucherNote +
            "', '" +
            slug +
            "', '" +
            CreateDate +
            "', '" +
            ExpDate +
            "', '" +
            req.body.MoneyDiscount +
            "');";
          request.query(str, (err, result) => {
            if (err) {
              res.status(400);
              res.send(err);
            } else res.status(201);
            res.send('Tạo thành công !');
          });
        }
      });
    }
  }

  // [POST] /api/CreateVoucherDuaDonSanBay  *đã test
  createVoucherDuaDonSanBay(req, res) {
    //res.send(req.body);
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(400);
      res.send('Ngày hết hạn phải lớn hơn ngày bắt đầu');
    } else {
      let sampleFile = req.files.ImageLink;
      let uploadPath =
        'src/public/img/' + req.body.CreateDate + sampleFile.name;
      sampleFile.mv(uploadPath, (err) => {
        if (err) {
          res.status(400);
          res.send(err);
        }
      });

      sql.connect(config, (err, result) => {
        let request = new sql.Request();
        if (err) {
          res.status(400);
          res.send('Error while querying database :- ' + err);
        } else {
          let request = new sql.Request();

          let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;

          let slug = tools.toslug(req.body.Name);
          let code = tools.randomcode();
          let CreateDate = req.body.CreateDate;
          let ExpDate = req.body.ExpDate;
          let str =
            'INSERT INTO Voucher (VoucherID,CatalogID,Name,PointCost,Discount,PartnerID,Quantity,Code,ImageLink,ContentHeader,PreContent,Contents,VoucherNote,slug,CreateDate,ExpDate,MoneyDiscount) ' +
            "VALUES (N'" +
            req.body.PartnerID +
            req.body.Name +
            "', N'duaDonSanBay', N'" +
            req.body.Name +
            "', " +
            req.body.PointCost +
            ', ' +
            req.body.Discount +
            ", '" +
            req.body.PartnerID +
            "', " +
            req.body.Quantity +
            ", N'" +
            code +
            "', '" +
            ImagePath +
            "', N'" +
            req.body.ContentHeader +
            "', N'" +
            req.body.PreContent +
            "', N'" +
            req.body.Contents +
            "', N'" +
            req.body.VoucherNote +
            "', '" +
            slug +
            "', '" +
            CreateDate +
            "', '" +
            ExpDate +
            "', '" +
            req.body.MoneyDiscount +
            "');";
          request.query(str, (err, result) => {
            if (err) {
              res.status(400);
              res.send(err);
            } else res.status(201);
            res.send('Tạo thành công !');
          });
        }
      });
    }
  }

  changeVoucherStatusByID(req, res) {
    sql.connect(config, (err, result) => {
      let str =
        "UPDATE Voucher SET Status = 'false' WHERE _id= '" + req.body._id + "'";
      let str2 =
        "UPDATE Voucher SET Status = 'true' WHERE _id= '" + req.body._id + "'";
      let str3 =
        "SELECT TOP 1 * FROM Voucher Where _id= '" + req.body._id + "'";
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        request.query(str3, (err, result1) => {
          if (err) {
            console.log('ERROR ' + err);
            throw err;
          } else {
            console.log(result1.recordset);
            if (result1.recordset.length != 0) {
              if (result1.recordset[0].Status == true) {
                request.query(str, function (err, result) {
                  if (err) {
                    console.log('ERROR ' + err);
                    throw err;
                  } else {
                    res.status(200);
                    res.send(
                      'Trạng thái voucher ' +
                        result1.recordset[0].Name +
                        ' đã đổi thành False !',
                    );
                  }
                });
              } else {
                request.query(str2, function (err, result) {
                  if (err) {
                    console.log('ERROR ' + err);
                    throw err;
                  } else {
                    res.status(200);
                    res.send(
                      'Trạng thái voucher ' +
                        result1.recordset[0].Name +
                        ' đã đổi thành True !',
                    );
                  }
                });
              }
            } else {
              res.status(400);
              res.send('Không tìm thấy Voucher với _id = ' + req.body._id);
            }
          }
        });
      }
    });
  }

  UserUseVoucher(req, res) {
    sql.connect(config, (err, result) => {
      let str =
        "SELECT TOP 1 * FROM CTVoucher WHERE TaiKhoan = '" +
        req.body.TaiKhoan +
        "' AND Code = '" +
        req.body.Code +
        "'";
      let str2 =
        "UPDATE TOP (1) CTVoucher set Status = 0 where Taikhoan = 'a' AND Code = 'VJBAYBAY' And Status = 1";
      let request = new sql.Request();
      if (err) {
        res.status(400);
        res.send('Error while querying database :- ' + err);
      } else {
        request.query(str, function (err, result) {
          if (err) {
            res.status(400);
            res.send('Error :- ' + err);
          } else {
            if (result.recordset.length != 0) {
              request.query(str2, function (err, result2) {
                if (err) {
                  res.status(400);
                  res.send('ERR: ' + err);
                } else {
                  res.status(200);
                  res.send('Đã dùng 1 Voucher !');
                }
              });
            } else {
              res.status(400);
              res.send('Người dùng không sở hữu Voucher này !');
            }
          }
        });
      }
    });
  }

  UpdateUserPointByTaiKhoan(req, res) {
    sql.connect(config, (err, result) => {
      let DiemHienTai, DiemTong;
      let str =
        "SELECT TOP 1 * FROM NguoiDung WHERE TaiKHoan = '" +
        req.body.TaiKhoan +
        "'";
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
            if (result.recordset.length != 0) {
              DiemHienTai = parseInt(result.recordset[0].DiemHienTai);
              DiemTong = parseInt(result.recordset[0].DiemTong);
              console.log(DiemHienTai + '  ' + DiemTong);
              DiemHienTai += parseInt(req.body.Diem);
              DiemTong += parseInt(req.body.Diem);
              console.log(DiemHienTai + '  ' + DiemTong);
              let str2 =
                'UPDATE NguoiDung SET DiemTong = ' +
                DiemTong +
                ', DiemHienTai = ' +
                DiemHienTai +
                " WHERE TaiKhoan = '" +
                req.body.TaiKhoan +
                "'";
              request.query(str2, (err, result2) => {
                if (err) {
                  res.status(400);
                  res.send('ERR: ' + err);
                } else {
                  res.status(200);
                  res.send(
                    'Cập nhật điểm thành công cho tài khoản ' +
                      req.body.TaiKhoan +
                      '!',
                  );
                }
              });
            } else {
              res.status(400);
              res.send('Tài khoản không tồn tại !');
            }
          }
        });
      }
    });
  }
}
module.exports = new ApiController();
