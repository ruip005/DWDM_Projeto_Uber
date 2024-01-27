const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: String,
        ref: 'user',
        required: true 
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Pending"
    },
    orderTotal: {
        type: Number,
        required: true
    },
    orderItems: {
        type: Array,
        required: true
    },
    orderAddress: {
        type: String,
        required: true
    },
    orderCity: {
        type: String,
        required: true
    },
    orderState: {
        type: String,
        required: true
    },
    orderZip: {
        type: String,
        required: true
    },
    orderPhone: {
        type: String,
        required: true
    },
    orderEmail: {
        type: String,
        required: true
    },
    orderPaymentMethod: {
        type: String,
        required: true
    },
    orderPaymentStatus: {
        type: String,
        required: true,
        default: "Pending"
    },
    campanyId: {
        type: String,
        required: true
    },
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;