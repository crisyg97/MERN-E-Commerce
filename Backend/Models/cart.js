const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cartItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number, 
                default: 1,
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('cart', cartSchema);