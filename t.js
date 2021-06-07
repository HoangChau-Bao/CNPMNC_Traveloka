const request = require('request');
request.post({url:'http://52.36.113.238:3000/api/UpdateUserPointByTaiKhoan', form: {TaiKhoan:'a', Diem: 100}}, function(err,httpResponse,body){ 
    if(err)
        throw err;
    console.log(body);
    console.log(httpResponse.statusCode);
 })


// request('http://52.36.113.238:3000/api/GetAllVoucher', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });