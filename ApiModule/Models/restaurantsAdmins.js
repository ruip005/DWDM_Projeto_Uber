const mongoose = require('mongoose');

const restaurantsAdminSchema = new mongoose.Schema({
    campanyId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
});

const restaurantsAdminModel = mongoose.model('restaurants_admin', restaurantsAdminSchema);

module.exports = restaurantsAdminModel;