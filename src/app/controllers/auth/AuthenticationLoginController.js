const passport = require('passport');
const passportLocal = require('passport-local');
const config = require('../../../config/db/dbconfig');
const sql = require('mssql');
const request = require('request');

let LocalStrategy = passportLocal.Strategy;
let taikhoan = '';
let matkhau = '';
let user = null;
let initPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'TaiKhoan',
        passwordField: 'MatKhau',
        passReqToCallback: true,
      },
      (req, TaiKhoan, MatKhau, done) => {
        try {
          // request.post(
          //   {
          //     url: 'https://oka1kh.azurewebsites.net/api/user/login',
          //     json: { email: TaiKhoan, pass: MatKhau },
          //   },
          //   function (err, httpResponse, body) {
          //     if (err) throw err;
          //     //console.log(httpResponse.statusCode);
          //     let token = httpResponse.body.data.token;
          //     console.log(token);
          //     if (httpResponse.statusCode == 404) {
          //       console.log(httpResponse.statusCode);
          //       return done(null, false);
          //     } else {
          //       request.get(
          //         {
          //           url: 'https://oka1kh.azurewebsites.net/api/profiles',
          //           headers: { authorization: token },
          //         },
          //         function (error, result) {
          //           //console.error('error:', error);
          //           //console.log('statusCode:', result && result.statusCode);
          //           let x = JSON.parse(result.body);
          //           user = x.data;
          //           console.log(user);
          //           return done(null, user);
          //         },
          //       );
          //     }
          //     //return done(null,false)
          //   },
          // );

          sql.connect(config, (err, NguoiDung) => {
            let str =
              "SELECT * FROM NguoiDung WHERE TaiKhoan= '" +
              TaiKhoan +
              "' AND Status='true' AND MatKhau='" +
              MatKhau +
              "'";
            let request = new sql.Request();
            request.query(str, function (err, NguoiDung) {
              taikhoan = '';
              matkhau = '';
              if (NguoiDung.recordset.length != 0) {
                console.log(NguoiDung.recordset);
                user = NguoiDung.recordset[0];
                taikhoan = user.TaiKhoan;
                matkhau = user.MatKhau;

                console.log(user);
                if (taikhoan == '') {
                  return done(null, false);
                }
                if (matkhau == '') {
                  return done(null, false);
                }
                console.log(user);
                return done(null, user);
              } else {
                taikhoan = '';
                matkhau = '';

                console.log('Sai ten dang nhap hoac tai khoan');
                return done(null, false);
              }
            });
          });
        } catch (error) {
          console.log(error);
          return done(null, false);
        }
      },
    ),
  );
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = initPassportLocal;
