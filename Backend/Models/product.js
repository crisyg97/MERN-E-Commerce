const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categories = ['electronics','cameras','laptop','accessories','headphones','food','books','clothes/shoes','beauty/health','sports','outdoor','home'];

var productSchema = new Schema ({
    name:{
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters'],
    },
    price:{
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0,
    },
    description:{
        type: String,
        required: [true, 'Please enter product description']
    },
    ratings:{
        type: Number,
        default: 0.0
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url : {
                type: String,
                required: true
            }
        }
    ],
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0,
    },
    numOfRevews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String, 
        required: true,
        enum: ['ACTIVE', 'INACTIVE']
    }
});

module.exports = mongoose.model('product', productSchema)