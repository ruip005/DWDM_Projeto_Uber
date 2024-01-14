const mongoose = require('mongoose');

const orderStatusSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false
    },
});

const orderStatusModel = mongoose.model('order_status', orderStatusSchema);

module.exports = orderStatusModel;