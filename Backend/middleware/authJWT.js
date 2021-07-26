const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const index = {};

index.verifyToken = async (req,res,next) => {
    try{
        const token = req.headers["X-Access-Token"];
        //token exist?
        if(!token){
            return res.status(400).json({message: 'no token provided'});
        }
        //token validation
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const userFound = await userModel.findById(decode.id, {password: 0});
        if(!userFound){
            return res.status(400).json({message: 'no user found'});
        }
        next();
    }catch{
        return res.status(400).json({message: 'unauthorized'});
    }
};


module.exports = index;