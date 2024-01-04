const mongoose = require('mongoose');

const appAdminSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true 
    },
});

const appAdminModel = mongoose.model('app_admin', appAdminSchema);

module.exports = appAdminModel;