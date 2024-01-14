const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: false
    },
});

const paymentMethodModel = mongoose.model('payment_method', paymentMethodSchema);

module.exports = paymentMethodModel;