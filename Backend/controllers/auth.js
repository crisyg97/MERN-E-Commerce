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
    //verify user exists
    await userModel.findOne({email: body.email}).exec(
        async (err, userFound) => {
            if(userFound){
                return res.status(404).json({message: 'user already registered'});
            }
        }
     )
    //encrypt password
    const hashPassw = await modelUser.encryptPassword(body.password)

    const newUser = new ModelUser({
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.userName,
        email: body.email,
        password: hashPassw,
        avatar: body.avatar,
        roles: body.roles,
        createAt: body.createAt
    });

    //relationship roles with users
    if(body.roles){
        const foundRoles = await modelRole.find({name: {$in: body.roles }});//save the roles that the user has
        newUser.roles = foundRoles.map(role => role._id);  //select the _id  
    }else{
        const role = await modelRole.findOne( {name :"user"} );
        newUser.roles = [role._id]; //in array role save the _id
    }

    newUser.save((err, user) => {
        if(err) {
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
    await userModel.findOne({email: body.email}).exec( async (err,userFound) => {
        if(err) {return res.json({err})}
        if(userFound) {
            const comparationResult = await userModel.comparePassword(body.password, userFound.password);
            if(comparationResult){
                const token = generateToken(userFound._id);
                return res.status(200).json({token});
            }else{
                return res.status(400).json({message: 'wrong password'})
            }
        }else{
            return res.status(400).json({message: 'something went wrong'})
        }
    })
}

module.exports = ctrl;