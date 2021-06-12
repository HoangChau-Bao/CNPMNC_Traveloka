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

// request.post({url:'https://oka1kh.azurewebsites.net/api/user', json: {email:"voucherTest17", pass: "123456"}}, function(err,httpResponse,body){ 
//     if(err)
//         throw err;
//     console.log(httpResponse.statusCode);
//     console.log(body.created[0].userId);
//  })

// request.post({url:'https://oka1kh.azurewebsites.net/api/user/update_point/2409', json: {point: -10}}, function(err,httpResponse,body){ 
//     if(err)
//         throw err;
//     console.log(body);
//     console.log(httpResponse.statusCode);
//  })

// request.get({url:'https://oka1kh.azurewebsites.net/api/profiles', headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImF1dGgiOlt7InVzZXJJZCI6MjM0NCwiZW1haWwiOiJnaWZ0MjIyQGdtYWlsLmNvbSIsInBhc3MiOiIxMjM0NTYiLCJmcmlzdE5hbWUiOm51bGwsImxhc3ROYW1lIjpudWxsLCJwaG9uZSI6bnVsbCwidXNlckFkZHJlc3MiOm51bGwsImNhcmRzIjpudWxsLCJ2YWx1ZV9Ub3RhbFBvaW50IjpudWxsfV19LCJpYXQiOjE2MjMyNDk2NDQsImV4cCI6MTYyMzMzNjA0NH0.ldanjlndc-pvlckJUGXJ6swcFdTyTFOjA9bT2oP3-Ec"}}, function (error, result) {
//   console.error('error:', error); 
//   console.log('statusCode:', result && result.statusCode); 
//   let x = JSON.parse(result.body);
//   console.log(x.data.auth);
// })

// request.patch({url:'https://oka1kh.azurewebsites.net/api/user/change_name/2409', json: { fristName: "Tien", lastName: "Bui Lam Nhat"}}, function(err,httpResponse,body){ 
//     if(err)
//         throw err;
//     console.log(body);
//     console.log(httpResponse.statusCode);
//  })

// request.get({url:"https://oka1kh.azurewebsites.net/api/userbyemail/Hotel2@gmail.com"}, function (error, result) {
//     //let x = JSON.parse(result.body);
//     //console.log(x.user[0].value_TotalPoint);
//     console.log(result.body);
// });


// request.patch({url:"https://oka1kh.azurewebsites.net/api/user/change_name/"+2416+"", json: { fristName: 'ho', lastName: 'ten'}}, function(err,httpResponse1,body1){ 
//     if(err)
//         throw err;
//     if(httpResponse1.statusCode == 200){
//       request.patch({url:"https://oka1kh.azurewebsites.net/api/user/change_phone/"+2416+"", json: { phone: 'sdt'}}, function(err2,httpResponse2,body2){ 
//         if(err)
//             throw err;
//         else if(httpResponse2.statusCode == 200){
//           console.log('OK!');
//           //res.redirect(req.get('referer'));
//         }
//         else res.status(400).send(err2);
//       })
//     }
//     else res.status(400).send(err);
//   })

request.delete({url:'https://oka1kh.azurewebsites.net/api/user/24342', function(err,httpResponse,body){ 
    if(err)
        throw err;
    console.log(body);
    console.log(httpResponse.statusCode);
 }})
