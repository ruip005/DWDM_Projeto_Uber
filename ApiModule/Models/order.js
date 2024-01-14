const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    orderStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order_status',
        required: true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment_method',
        required: true
    },
    orderPaymentStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment_status',
        required: true
    },
    CampanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true
    },
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;