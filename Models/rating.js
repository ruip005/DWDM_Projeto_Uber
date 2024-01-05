const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    campanyId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true 
    },
    ratingContainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rating_box',
        required: true
    },
});

const ratingModel = mongoose.model('rating', ratingSchema);

module.exports = ratingModel;