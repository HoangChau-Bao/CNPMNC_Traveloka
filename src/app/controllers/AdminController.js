class AdminController {
  //[GET] /admin/vouchermanage
  vouchermanage(req, res) {
    res.render('admin/vouchermanage');
  }
}
module.exports = new AdminController();
