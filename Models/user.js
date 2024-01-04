const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true 
    },
    lastName: { 
        type: String,
        required: true 
    },
    email: { 
        type: String,
        required: true 
    },
    phone: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: false
    },
    birthday: {
        type: Date,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;