const mongoose = require('mongoose');

const paymentStatusSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false
    },
});

const paymentStatusModel = mongoose.model('payment_status', paymentStatusSchema);

module.exports = paymentStatusModel; // To do !!!!