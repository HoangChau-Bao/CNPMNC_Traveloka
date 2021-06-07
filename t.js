
var request = require('request');
request('52.36.113.238:3000/api/GetAllUser', function (error, response, result) {
    if (!error) {
        let a = JSON.parse(result);
        console.log(a.recordsets[1].TaiKhoan);
     }
     else{
         console.log(error);
     }
})