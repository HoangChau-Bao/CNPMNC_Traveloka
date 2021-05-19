const config = require('../../config/db/dbconfig');
const sql = require('mssql');
const tools = require('../../util/tools');

class VoucherController {
  //[GET] /vouchers/:slug
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
            console.log(result.recordset);
            res.render('vouchers/show', { voucher: result.recordset });
          }
        });
      }
    });
  }

  //[GET] /vouchers/addvoucher
  add(req, res) {
    res.render('vouchers/addvoucher');
  }

  // [POST] /vouchers/store
  store(req, res, next) {
    sql.connect(config, (err, result) => {
      let request = new sql.Request();
      if (err) {
        console.log('Error while querying database :- ' + err);
        throw err;
      } else {
        res.json(req.body);
        //let request = new sql.Request();
        //let slug = tools.toslug(req.body.Name);
        //let CreateDate = Date(req.body.CreateDate);
        //let ExpDate = new Date(req.body.ExpDate);

        // let str = "INSERT INTO Voucher (VoucherID,CatalogID,Name,PointCost,Discount,PartnerID,Quantity,Code,ImageLink,ContentHeader,PreContent,Contents,VoucherNote,slug) "
        //   + "VALUES (N'"+req.body.VoucherID+"', N'"+req.body.CatalogID+"', N'"+req.body.Name+"', "+req.body.PointCost+", "+req.body.Discount+", '"+req.body.PartnerID+"', "+req.body.Quantity+", N'"+req.body.Code+"', '"+req.body.ImageLink+"', N'"+req.body.ContentHeader+"', N'"+req.body.PreContent+"', N'"+req.body.Contents+"', N'"+req.body.VoucherNote+"', '"+slug+"');"
        // request.query(str,(err,result) => {
        //   if(err)
        //     throw err;
        //   else
        //     res.redirect('/');
        // });
      }
    });
  }
}

module.exports = new VoucherController();
