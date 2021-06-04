
var request = require('request');
request('http://localhost:3000/api/GetAllUser', function (error, response, result) {
    if (!error) {
        let a = JSON.parse(result);
        console.log(a.recordset[1].TaiKhoan);
     }
})