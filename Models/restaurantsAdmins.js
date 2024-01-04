const mongoose = require('mongoose');

const restaurantsAdminSchema = new mongoose.Schema({
    campanyId: { 
        type: String,
        required: true 
    },
    userId: { 
        type: String,
        required: true 
    },
});

const restaurantsAdminModel = mongoose.model('restaurants_admin', restaurantsAdminSchema);

module.exports = appAdminModel;