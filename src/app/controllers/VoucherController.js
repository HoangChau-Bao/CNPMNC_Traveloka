const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const tools = require('../../util/tools');
const { renderSync } = require('node-sass');

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
            if (result.recordset[0].Status == true) {
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

  // [POST] /vouchers/store  *lưu voucher
  store(req, res, next) {
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
      let sampleFile = req.files.ImageLink;
      let uploadPath =
        'src/public/img/' + req.body.CreateDate + sampleFile.name;
      sampleFile.mv(uploadPath, (err) => {
        if (err) return res.send(err);
      });

      sql.connect(config, (err, result) => {
        let request = new sql.Request();
        if (err) {
          console.log('Error while querying database :- ' + err);
          throw err;
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
            if (err) throw err;
            else res.redirect('/admin/vouchermanage');
          });
        }
      });
    }
  }

  //[POST] /voucher/deletevoucher
  deletevoucher(req, res) {
    console.log('Delete voucher');
    res.send(req.body);
  }
}

module.exports = new VoucherController();
