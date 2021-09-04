const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

var userSchema = new Schema({
    firstName : {
        type: String,
        required: [true, 'Please enter your firstName'],
        maxLenght: [30, 'Your firstName cannot exceed 30 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your lastName'],
        maxLenght: [30, 'Your lastName cannot exceed 30 characters']
    },
    userName: {
        type: String,
        required: [true, 'Please enter your userName'],
        maxLenght: [20, 'Your userName cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLenght: [6, 'Your password must be longer than 6 characters']
    },
    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'role',
        required: true
    }],
    createAt: {
        type: Date,
        default: Date.now()
    }
});


userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt); 
}

userSchema.statics.comparePassword = async (password, receivePassword) => {
    return await bcrypt.compare(password, receivePassword);
}

module.exports = mongoose.model('user' ,userSchema)