
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Voucher = new Schema({
  name: { type:String,  maxLength: 255, require: true},
  age: { type:Number }
});

module.exports = mongoose.model('Voucher', Voucher);