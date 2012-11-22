/*
var mongoose = require('mongoose');
 
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;
 
// create Widget model
var Widget = new Schema({
  sn : {type: String, require: true, trim: true, unique: true}, 
  name : {type: String, required: true, trim: true},
  desc : String,
  price : Number
});
 
module.exports = mongoose.model('Widget', Widget);
*/
var mongoose = require('mongoose');
 
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;
 
// create Widget model
var City = new Schema({
  name : {type: String, required: true, trim: true},
  population : Number,
  area : Number
});
 
module.exports = mongoose.model('City', City);