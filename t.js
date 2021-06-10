const { json } = require('express');
const request = require('request');
// request.post({url:'http://52.36.113.238:3000/api/UserUseVoucher', form: {TaiKhoan:"a", Code: "VJBAYBAY"}}, function(err,httpResponse,body){ 
//     if(err)
//         throw err;
//     console.log(body);
//     console.log(httpResponse.statusCode);
//  })


// request('https://oka1kh.azurewebsites.net/api/users', function (error, result) {
//   console.error('error:', error); 
//   console.log('statusCode:', result && result.statusCode); 
//   console.log('body:', result.User[0].userId);
// })

// request.post({url:'https://oka1kh.azurewebsites.net/api/user/login', json: {email:"nhattien123@gmail.com", pass: "123456"}}, function(err,httpResponse,body){ 
//     if(err)
//         throw err;
//     console.log(httpResponse.statusCode);
//     //console.log(httpResponse.body.data.token);
//  })

request.post({url:'https://oka1kh.azurewebsites.net/api/user', json: {email:"gift1", pass: "1"}}, function(err,httpResponse,body){ 
    if(err)
        throw err;
    console.log(body);
    console.log(httpResponse.statusCode);
 })

// request.get({url:'https://oka1kh.azurewebsites.net/api/profiles', headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImF1dGgiOlt7InVzZXJJZCI6MjM0NCwiZW1haWwiOiJnaWZ0MjIyQGdtYWlsLmNvbSIsInBhc3MiOiIxMjM0NTYiLCJmcmlzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJwaG9uZSI6bnVsbCwidXNlckFkZHJlc3MiOm51bGwsImNhcmRzIjpudWxsLCJ2YWx1ZV9Ub3RhbFBvaW50IjpudWxsfV19LCJpYXQiOjE2MjMyNDk2NDQsImV4cCI6MTYyMzMzNjA0NH0.ldanjlndc-pvlckJUGXJ6swcFdTyTFOjA9bT2oP3-Ec"}}, function (error, result) {
//   console.error('error:', error); 
//   console.log('statusCode:', result && result.statusCode); 
//   let x = JSON.parse(result.body);
//   console.log(x.data.auth);
// })
