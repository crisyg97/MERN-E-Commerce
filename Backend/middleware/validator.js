
const userModel = require('../models/role');
const roleModel = require('../models/role');
const index = {};

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
    if(reqRoles){ //if roles not empty
        for(let i=0; i < reqRoles.length; i++){
            if(!roles.includes(reqRoles[i])){ //verify that the roles are in the database
                return res.status(400).json({ message: 'role ${reqRoles[i]} does not exists'})
            }
        }
    }
    next();
}

module.exports = index;