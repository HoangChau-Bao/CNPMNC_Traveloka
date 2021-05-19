class UserController {
  //[GET] /user/login
  login(req, res) {
    res.render('user/login');
  }

  //[GET] /user/register
  register(req, res) {
    res.render('user/register');
  }
}
module.exports = new UserController();
