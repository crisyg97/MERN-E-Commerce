const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const index = {};

index.verifyToken = async (req,res,next) => {
    try{
        const token = req.headers['authorization'];
        //token exist?
        if(!token){
            return res.status(400).json({message: 'no token provided'});
        }
        //token validation
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.id;
        const userFound = await userModel.findById(decode.id, {password: 0});
        if(!userFound){
            return res.status(400).json({message: 'no user found'});
        }
        req.token = token;
        next();
    }catch(err){
        console.log(err);
        return res.status(400).json({message: 'unauthorized'});
    }
};


module.exports = index;