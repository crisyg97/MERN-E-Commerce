const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const roleModel = require('../models/role');
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

index.isModerator = async (res,req,next) => {
    const user =  await userModel.findById(req.id);
    const roles = await roleModel.find({ _id: {$in : user.roles } });

    for(let i=0; i < roles.length; i++){
        if(roles[i].name === "moderator"){
            next();
            return;
        }
    }
    return res.status(403).json({message: "required role moderator"})
};

index.isAdmin = async (res,req,next) => {
    const user =  await userModel.findById(req.id);
    const roles = await roleModel.find({ _id: {$in : user.roles } });

    for(let i =0; i < roles.length; i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }
    }
    return res.status(403).json({message: "required role admin"})
}

module.exports = index;