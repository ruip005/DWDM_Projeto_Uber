const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    campanyId: { 
        type: String,
        required: true 
    },
    ratingContainerId: {
        type: String,
        required: true
    },
});

const ratingModel = mongoose.model('rating', ratingSchema);

module.exports = ratingModel;