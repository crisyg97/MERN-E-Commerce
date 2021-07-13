const mongoose = require('mongoose');
const dotenv = require('config').config();
const uri = process.env.URL_MONGO;

module.exports.connect = function() {
  mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
  var db = mongoose.connection;
  db.once("open", function(callback){
    console.log("Connection Succeeded");
  });  
  db.on("error", console.error.bind(console, "connection error"));
  return db;
}