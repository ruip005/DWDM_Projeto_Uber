const mongoose = require('mongoose');

const ratingContainerSchema = new mongoose.Schema({
    dateCreated : {
        type: Date,
        default: Date.now
    },
});

const ratingContainerModel = mongoose.model('rating_container', ratingContainerSchema);

module.exports = ratingContainerModel;