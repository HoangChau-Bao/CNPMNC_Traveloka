const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const tools = require('../../util/tools');
const fs = require('fs');
const path = require('path');
const { renderSync } = require('node-sass');
const AWS = require('aws-sdk');

const multer = require('multer');
const sqlschedule = require('../../util/sqlschedule');
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback('null', '');
  },
});
const upload = multer({ storage }).single('image');

class VoucherController {
  //[GET] /vouchers/:slug   *vào trang chi tiết voucher
  show(req, res, next) {
    sql.connect(config, (err, result) => {
      let str =
        "SELECT TOP(1) * FROM Voucher WHERE slug = '" + req.params.slug + "' ;";
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
            if (result.recordset[0].Status == 1) {
              console.log(req.flash('thongbao'));
              res.render('vouchers/show', {
                thongbao: req.flash('thongbao'),
                voucher: result.recordset,
              });
            } else {
              res.send('404 !');
            }
          }
        });
      }
    });
  }

  //[GET] /vouchers/addvoucher
  add(req, res) {
    res.render('vouchers/addvoucher');
    //res.send(req.user)
  }

  addvoucherpartner(req, res) {
    res.render('vouchers/addvoucherpartner');
  }

  // [POST] /vouchers/store  *lưu voucher đã test case
  store(req, res, next) {
    //res.send(req.body);
    let imgLink;
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.render('vouchers/addvoucher', {
        messages: 'Ngày hết hạn phải lớn hơn ngày bắt đầu !',
      });
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
              "', N'" +
              req.body.CatalogID +
              "', N'" +
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
              else res.redirect('/admin/vouchermanage');
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

  //[POST] /voucher/store2 chưa test case
  store2(req, res, next) {
    //res.send(req.body);
    let StartDate = Date.parse(req.body.CreateDate);
    console.log(StartDate);
    let EndDate = Date.parse(req.body.ExpDate);
    console.log(EndDate);
    if (StartDate > EndDate) {
      res.render('vouchers/addvoucher', {
        messages: 'Ngày hết hạn phải lớn hơn ngày bắt đầu !',
      });
    } else {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      });
      console.log(req.files.ImageLink);
      let key = Date.now() + req.files.ImageLink.name;
      let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: req.files.ImageLink.data,
      };
      let imgLink;
      s3.upload(params, (err, result) => {
        if (err) {
          console.log(err);
          throw err;
          res.status(500).send(err);
        } else {
          console.log(result.Location);
          imgLink = result.Location;
          console.log('imgLink: ' + imgLink);
          //res.status(200).send(result);
        }
      });

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
              req.user.PartnerID +
              req.body.Name +
              "', N'" +
              req.body.CatalogID +
              "', N'" +
              req.body.Name +
              "', " +
              req.body.PointCost +
              ', ' +
              req.body.Discount +
              ", '" +
              req.user.PartnerID +
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
              if (err) throw err;
              else res.redirect('/user/profile');
            });
          }
        });
      }
      setTimeout(sqlCon, 4000);
    }
  }

  //[POST] /voucher/deletevoucher
  deletevoucher(req, res) {
    //console.log(req.body);
    let _id = req.body._id;
    let str =
      ' DELETE Voucher ' +
      'FROM Voucher ' +
      'INNER JOIN CTVoucher ON Voucher._id = CTVoucher.Voucher_id ' +
      'WHERE Voucher._id = ' +
      _id +
      ' AND Voucher.Status = 0 AND CTVoucher.Status = 0 AND getdate() > CONVERT(DATETIME, Voucher.ExpDate)' +
      'DELETE CTVoucher ' +
      'FROM CTVoucher ' +
      'LEFT JOIN Voucher ON Voucher._id = CTVoucher.Voucher_id ' +
      'WHERE Voucher._id is null ' +
      'DELETE FROM Voucher Where _id = ' +
      _id +
      ' AND Status = 0 AND getdate() > CONVERT(DATETIME, ExpDate)';

    let status = req.body.Status;
    let imagelink = req.body.ImageLink;
    //console.log(__dirname + imagelink.split("/").join("\\"));
    console.log(
      path.resolve('src', 'public') + imagelink.split('/').join('\\'),
    );
    if (status == 'false') {
      sql.connect(config, (err, result) => {
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
              console.log(path);
              fs.unlinkSync(
                path.resolve('src', 'public') + imagelink.split('/').join('\\'),
              );
              res.redirect('/admin/vouchermanage');
            }
          });
        }
      });
    } else {
      res.redirect('/admin/vouchermanage');
    }
  }
}

module.exports = new VoucherController();
