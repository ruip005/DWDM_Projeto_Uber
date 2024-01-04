const mongoose = require('mongoose');

const ratingCommentsSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true 
    },
    userOpinion: {
        type: String,
        required: false
    },
    ratingContainerId: {
        type: String,
        required: true
    },
    ratingStars: {
        type: Number,
        required: true
    },
});

const ratingCommentsModel = mongoose.model('rating_comments', ratingCommentsSchema);

module.exports = ratingCommentsModel;