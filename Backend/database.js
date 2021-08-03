const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const uri = process.env.URL_MONGO_LOCAL;

module.exports.connect = function() {

  const conStr = 'mongodb://localhost:27017/e-commerce';
  mongoose.connect(conStr, {
      usedNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
  }).then((con) => console.log('DB connection successful'));
};