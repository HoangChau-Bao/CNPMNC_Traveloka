const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const tools = require('../../util/tools');
const request = require('request');
const { uploadFile } = require('../../util/s3');
const multer = require('multer');
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback('null', '');
  },
});
const upload = multer({ storage }).single('image');

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

class ApiController {
  testPostImgs3(req, res) {
    console.log(req.files.ImageLink);
    let key = Date.now() + req.files.ImageLink.name;
    let params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.files.ImageLink.data,
    };

    s3.upload(params, (err, result, callback) => {
      if (err) {
        console.log(err);
        callback();
        //res.status(500).send(err);
      } else {
        console.log(result.Location);
        callback();
        //res.status(200).send(result);
      }
    });
  }

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
              res.send('Kh??ng c?? Voucher v???i _id n??y !');
            }
          }
        });
      }
    });
  }

  //[GET] /api/GetVoucherByCode
  GetVoucherByCode(req, res) {
    sql.connect(config, (err, result) => {
      let str = "SELECT * FROM Voucher WHERE Code = '" + req.query.Code + "'";
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
            if (result.recordset.length == 0) {
              res.status(400);
              res.send('Code kh??ng t???n t???i !');
            } else {
              res.status(200);
              res.json(result);
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

  // [POST] /api/CreateVoucherKhachSan  *???? test
  createVoucherKhachSan(req, res) {
    let imgLink;
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(200).send(' Ng??y b???t ?????u ph???i b?? h??n ng??y k???t th??c !');
    } else {
      saveimg(true, sqlCon);
      function sqlCon() {
        sql.connect(config, (err, result) => {
          let request = new sql.Request();
          if (err) {
            console.log('Error while querying database :- ' + err);
            throw err;
          } else {
            let request = new sql.Request();

            //let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;
            console.log('imgLink 2: ' + imgLink);
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
              imgLink +
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
              if (err) res.status(400).send(err);
              else res.status(200).send('Th??m m???i th??nh c??ng !');
            });
          }
        });
      }

      function saveimg(x, callback) {
        const s3 = new AWS.S3({
          accessKeyId: 'AKIAZFXHRHWTCDY6IJV3',
          secretAccessKey: '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',
        });
        console.log(req.files.ImageLink);
        let key = Date.now() + req.files.ImageLink.name;
        let params = {
          Bucket: 'cnpm-bucket-voucher-team',
          Key: key,
          Body: req.files.ImageLink.data,
        };
        s3.upload(params, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            console.log(result.Location);
            imgLink = result.Location;
            console.log('imgLink: ' + imgLink);
            callback();
            //res.status(200).send(result);
          }
        });
      }
    }
  }

  // [POST] /api/CreateVoucherThueXe  *???? test
  createVoucherThueXe(req, res) {
    let imgLink;
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(200).send(' Ng??y b???t ?????u ph???i b?? h??n ng??y k???t th??c !');
    } else {
      saveimg(true, sqlCon);
      function sqlCon() {
        sql.connect(config, (err, result) => {
          let request = new sql.Request();
          if (err) {
            console.log('Error while querying database :- ' + err);
            throw err;
          } else {
            let request = new sql.Request();

            //let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;
            console.log('imgLink 2: ' + imgLink);
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
              imgLink +
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
              if (err) res.status(400).send(err);
              else res.status(200).send('Th??m m???i th??nh c??ng !');
            });
          }
        });
      }

      function saveimg(x, callback) {
        const s3 = new AWS.S3({
          accessKeyId: 'AKIAZFXHRHWTCDY6IJV3',
          secretAccessKey: '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',
        });
        console.log(req.files.ImageLink);
        let key = Date.now() + req.files.ImageLink.name;
        let params = {
          Bucket: 'cnpm-bucket-voucher-team',
          Key: key,
          Body: req.files.ImageLink.data,
        };
        s3.upload(params, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            console.log(result.Location);
            imgLink = result.Location;
            console.log('imgLink: ' + imgLink);
            callback();
            //res.status(200).send(result);
          }
        });
      }
    }
  }

  // [POST] /api/CreateVoucherVeMayBay  *???? test
  createVoucherVeMayBay(req, res) {
    let imgLink;
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(200).send(' Ng??y b???t ?????u ph???i b?? h??n ng??y k???t th??c !');
    } else {
      saveimg(true, sqlCon);
      function sqlCon() {
        sql.connect(config, (err, result) => {
          let request = new sql.Request();
          if (err) {
            console.log('Error while querying database :- ' + err);
            throw err;
          } else {
            let request = new sql.Request();

            //let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;
            console.log('imgLink 2: ' + imgLink);
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
              imgLink +
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
              if (err) res.status(400).send(err);
              else res.status(200).send('Th??m m???i th??nh c??ng !');
            });
          }
        });
      }

      function saveimg(x, callback) {
        const s3 = new AWS.S3({
          accessKeyId: 'AKIAZFXHRHWTCDY6IJV3',
          secretAccessKey: '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',
        });
        console.log(req.files.ImageLink);
        let key = Date.now() + req.files.ImageLink.name;
        let params = {
          Bucket: 'cnpm-bucket-voucher-team',
          Key: key,
          Body: req.files.ImageLink.data,
        };
        s3.upload(params, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            console.log(result.Location);
            imgLink = result.Location;
            console.log('imgLink: ' + imgLink);
            callback();
            //res.status(200).send(result);
          }
        });
      }
    }
  }

  // [POST] /api/CreateVoucherCanHoBietThu  *???? test
  createVoucherCanHoBietThu(req, res) {
    let imgLink;
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(200).send(' Ng??y b???t ?????u ph???i b?? h??n ng??y k???t th??c !');
    } else {
      saveimg(true, sqlCon);
      function sqlCon() {
        sql.connect(config, (err, result) => {
          let request = new sql.Request();
          if (err) {
            console.log('Error while querying database :- ' + err);
            throw err;
          } else {
            let request = new sql.Request();

            //let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;
            console.log('imgLink 2: ' + imgLink);
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
              imgLink +
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
              if (err) res.status(400).send(err);
              else res.status(200).send('Th??m m???i th??nh c??ng !');
            });
          }
        });
      }

      function saveimg(x, callback) {
        const s3 = new AWS.S3({
          accessKeyId: 'AKIAZFXHRHWTCDY6IJV3',
          secretAccessKey: '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',
        });
        console.log(req.files.ImageLink);
        let key = Date.now() + req.files.ImageLink.name;
        let params = {
          Bucket: 'cnpm-bucket-voucher-team',
          Key: key,
          Body: req.files.ImageLink.data,
        };
        s3.upload(params, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            console.log(result.Location);
            imgLink = result.Location;
            console.log('imgLink: ' + imgLink);
            callback();
            //res.status(200).send(result);
          }
        });
      }
    }
  }

  // [POST] /api/CreateVoucherTourDuLich  *???? test
  createVoucherTourDuLich(req, res) {
    let imgLink;
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(200).send(' Ng??y b???t ?????u ph???i b?? h??n ng??y k???t th??c !');
    } else {
      saveimg(true, sqlCon);
      function sqlCon() {
        sql.connect(config, (err, result) => {
          let request = new sql.Request();
          if (err) {
            console.log('Error while querying database :- ' + err);
            throw err;
          } else {
            let request = new sql.Request();

            //let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;
            console.log('imgLink 2: ' + imgLink);
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
              imgLink +
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
              if (err) res.status(400).send(err);
              else res.status(200).send('Th??m m???i th??nh c??ng !');
            });
          }
        });
      }

      function saveimg(x, callback) {
        const s3 = new AWS.S3({
          accessKeyId: 'AKIAZFXHRHWTCDY6IJV3',
          secretAccessKey: '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',
        });
        console.log(req.files.ImageLink);
        let key = Date.now() + req.files.ImageLink.name;
        let params = {
          Bucket: 'cnpm-bucket-voucher-team',
          Key: key,
          Body: req.files.ImageLink.data,
        };
        s3.upload(params, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            console.log(result.Location);
            imgLink = result.Location;
            console.log('imgLink: ' + imgLink);
            callback();
            //res.status(200).send(result);
          }
        });
      }
    }
  }

  // [POST] /api/CreateVoucherDuaDonSanBay  *???? test
  createVoucherDuaDonSanBay(req, res) {
    let imgLink;
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.status(200).send(' Ng??y b???t ?????u ph???i b?? h??n ng??y k???t th??c !');
    } else {
      saveimg(true, sqlCon);
      function sqlCon() {
        sql.connect(config, (err, result) => {
          let request = new sql.Request();
          if (err) {
            console.log('Error while querying database :- ' + err);
            throw err;
          } else {
            let request = new sql.Request();

            //let ImagePath = '/img/' + req.body.CreateDate + sampleFile.name;
            console.log('imgLink 2: ' + imgLink);
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
              imgLink +
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
              if (err) res.status(400).send(err);
              else res.status(200).send('Th??m m???i th??nh c??ng !');
            });
          }
        });
      }

      function saveimg(x, callback) {
        const s3 = new AWS.S3({
          accessKeyId: 'AKIAZFXHRHWTCDY6IJV3',
          secretAccessKey: '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',
        });
        console.log(req.files.ImageLink);
        let key = Date.now() + req.files.ImageLink.name;
        let params = {
          Bucket: 'cnpm-bucket-voucher-team',
          Key: key,
          Body: req.files.ImageLink.data,
        };
        s3.upload(params, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            console.log(result.Location);
            imgLink = result.Location;
            console.log('imgLink: ' + imgLink);
            callback();
            //res.status(200).send(result);
          }
        });
      }
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
                      'Tr???ng th??i voucher ' +
                        result1.recordset[0].Name +
                        ' ???? ?????i th??nh False !',
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
                      'Tr???ng th??i voucher ' +
                        result1.recordset[0].Name +
                        ' ???? ?????i th??nh True !',
                    );
                  }
                });
              }
            } else {
              res.status(400);
              res.send('Kh??ng t??m th???y Voucher v???i _id = ' + req.body._id);
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
        "' AND Status = 1";
      let str2 =
        "UPDATE TOP (1) CTVoucher set Status = 0 where Taikhoan ='" +
        req.body.TaiKhoan +
        "' AND Code = '" +
        req.body.Code +
        "' And Status = 1";
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
                  res.send('???? d??ng 1 Voucher !');
                }
              });
            } else {
              res.status(400);
              res.send('Ng?????i d??ng kh??ng s??? h???u Voucher n??y !');
            }
          }
        });
      }
    });
  }

  UpdateUserPointByTaiKhoan(req, res) {
    // sql.connect(config, (err, result) => {
    //   let DiemHienTai, DiemTong;
    //   let str =
    //     "SELECT TOP 1 * FROM NguoiDung WHERE TaiKHoan = '" +
    //     req.body.TaiKhoan +
    //     "'";
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
    //         if (result.recordset.length != 0) {
    //           DiemHienTai = parseInt(result.recordset[0].DiemHienTai);
    //           DiemTong = parseInt(result.recordset[0].DiemTong);
    //           console.log(DiemHienTai + '  ' + DiemTong);
    //           DiemHienTai += parseInt(req.body.Diem);
    //           DiemTong += parseInt(req.body.Diem);
    //           console.log(DiemHienTai + '  ' + DiemTong);
    //           let str2 =
    //             'UPDATE NguoiDung SET DiemTong = ' +
    //             DiemTong +
    //             ', DiemHienTai = ' +
    //             DiemHienTai +
    //             " WHERE TaiKhoan = '" +
    //             req.body.TaiKhoan +
    //             "'";
    //           request.query(str2, (err, result2) => {
    //             if (err) {
    //               res.status(400);
    //               res.send('ERR: ' + err);
    //             } else {
    //               res.status(200);
    //               res.send(
    //                 'C???p nh???t ??i???m th??nh c??ng cho t??i kho???n ' +
    //                   req.body.TaiKhoan +
    //                   '!',
    //               );
    //             }
    //           });
    //         } else {
    //           res.status(400);
    //           res.send('T??i kho???n kh??ng t???n t???i !');
    //         }
    //       }
    //     });
    //   }
    // });

    //tich hop profile
    let diem = parseInt(req.body.Diem);
    let taikhoan = req.body.TaiKhoan;
    let id;
    request.get(
      {
        url:
          'https://oka1kh.azurewebsites.net/api/userbyemail/' + taikhoan + '',
      },
      function (error, result) {
        if (result.body == 'not found')
          res.status(400).send('Kh??ng th???y t??i kho???n !');
        else {
          let x = JSON.parse(result.body);
          id = x.user[0].userId;
          request.post(
            {
              url:
                'https://oka1kh.azurewebsites.net/api/user/update_point/' +
                id +
                '',
              json: { point: diem },
            },
            function (err, httpResponse, body) {
              if (err) res.status(400).send(err);
              else res.status(200).send('???? c???p nh???t ??i???m !');
            },
          );
        }
      },
    );
  }
}
module.exports = new ApiController();
