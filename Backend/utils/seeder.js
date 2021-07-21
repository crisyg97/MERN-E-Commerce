const productModel = require('../models/product');
const dotenv = require('dotenv');
const connectionDb = require('../database');

const products = require('../datos/products');
//setting dotenv
dotenv.config({ path: 'backend/config/config.env' });
//connect database
connectionDb.connect();

const seedsProducts = async () => {
    try{
        await productModel.deleteMany(); //delete all products
        console.log('Products deleted');
        
        await productModel.insertMany(products).then(() => {console.log('all products added')}) //insert all products of .json
        process.exit(); //force the program to terminate
    }catch(err){
        console.log(err);
        process.exit();
    }
}
seedsProducts();