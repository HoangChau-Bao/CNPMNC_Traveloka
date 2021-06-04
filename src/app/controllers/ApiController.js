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
}
module.exports = new ApiController();
