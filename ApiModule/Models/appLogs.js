const mongoose = require('mongoose');

const appLogsSchema = new mongoose.Schema({
    dateCreated : {
        type: Date,
        default: Date.now
    },
    CreatedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
    restaurantId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: false
    },
    action : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: false
    },
    canStaffView : {
        type: Boolean,
        required: true,
        default: false
    },
});

const appLogsModel = mongoose.model('logs', appLogsSchema);

module.exports = appLogsModel;