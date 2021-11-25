const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'please enter name category' ],
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    categoryImg: { type: String },
    parentId: {
        type: String,
    }
});

module.exports = mongoose.model('category', categorySchema);