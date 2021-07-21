const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const uri = process.env.URL_MONGO_LOCAL;

var MongoClient = require('mongodb').MongoClient;

module.exports.connect = function() {

  const conStr = 'mongodb://localhost:27017/e-commerce';
  mongoose.connect(conStr, {
      usedNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
  }).then((con) => console.log('DB connection successful'));
  /*mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  var db = mongoose.connection;
  db.once("open", function(callback){
    console.log("Connection Succeeded");
  });  
  db.on("error", console.error.bind(console, "connection error"));
  return db;
  */
};