const userModel = require('../models/user');
const roleModel = require('../models/role');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const ctrl = {};

const generateToken = (_id) => {
    return jwt.sign({id: _id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

ctrl.signup = async (req, res, next) => {
    const body = req.body;
    console.log(body);
    //verify user exists
    await userModel.findOne({email: body.email}, (err,userFound) => {
        if(userFound){
            return res.status(404).json({message: userFound});
        }
    })
    //encrypt password
    const hashPassw = await userModel.encryptPassword(body.password)

    const newUser = new userModel({
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.userName,
        email: body.email,
        password: hashPassw,
        avatar: body.avatar,
        roles: body.roles
    });

    //relationship roles with users
    if(body.roles){
        const foundRoles = await roleModel.find({name: {$in: body.roles }});//save the roles that the user has
        newUser.roles = foundRoles.map(role => role._id);  //select the _id  
    }else{
        const role = await roleModel.findOne( {name :"user"} );
        newUser.roles = [role._id]; //in array role save the _id
    }

    newUser.save((err, user) => {
        if(err) {
            console.log(err);
            res.status(400).json({message: 'something went wrong'});
        }
        if(user){
            const token = generateToken(user._id);
            return res.status(201).json({token});
        }
    });


}

ctrl.signin = async (req, res, next) => {
    const body = req.body;
    await userModel.findOne({email: body.email}, async (err, userFound) => {
        console.log(userFound);
        if(err) {
            console.log(err)
            return res.json({message: 'something went wrong'});
        }
        if(userFound) {
            const comparationResult = await userModel.comparePassword(body.password, userFound.password);
            if(comparationResult){
                const token = generateToken(userFound._id);
                return res.status(200).json({token});
            }else{
                return res.status(400).json({message: 'wrong password'});
            }
        }else{
            return res.status(400).json({message: 'user email not found'});
        }
    });
}

module.exports = ctrl;