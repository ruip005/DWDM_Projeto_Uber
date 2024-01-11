const mongoose = require('mongoose');

const ratingCommentsSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
    userOpinion: {
        type: String,
        required: false
    },
    ratingContainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rating_box',
        required: true
    },
    ratingStars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
});

const ratingCommentsModel = mongoose.model('rating_comments', ratingCommentsSchema);

module.exports = ratingCommentsModel;