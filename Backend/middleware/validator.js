const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const roleModel = require('../models/role');
const index = {};

index.isModerator = async (res,req,next) => {
    const token = req.headers['x-access-token'];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userFound =  await userModel.findById(decode.id);
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
    try{
        console.log(req.userId);
        const userFound =  await userModel.findById(req.userId, (err) => {
            if(err)
                console.log(err);
        });
        const roles = await roleModel.find({ _id: {$in : userFound.roles } });
        console.log(roles);
        for(let i =0; i < roles.length; i++){
            if(roles[i].name === "admin"){
                next();
                return;
            }
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({message: 'unauthorized'});
    }
    return res.status(403).json({message: "required role admin"})
}

index.checkDuplicatedUserOrEmail = async (req, res, next) => {
    const usernameFound = await userModel.findOne({username: req.body.username});
    if(usernameFound){
        return res.status(400).json({message: 'user already exists'});
    }
    const emailFound = await userModel.findOne({email: req.body.email});
    if(emailFound){
        return res.status(400).json({message: 'email already exists'});
    }
    next();
}

//not Create roles nonexistent
index.checkRolesExists = async (req, res, next) => {
    const reqRoles = req.body.roles;
    const roles = await roleModel.find();
    const rolesId = roles.map((role) => { return role._id});
    if(reqRoles){ //if roles not empty
        for(let i=0; i < reqRoles.length; i++){
            if(rolesId.includes(reqRoles[i])){ //verify that the roles are in the database
                return res.status(400).json({ message: `role ${reqRoles[i]} does not exists`})
            }
        }
    }
    next();
}

module.exports = index;