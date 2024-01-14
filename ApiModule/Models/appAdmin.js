const mongoose = require('mongoose');

const appAdminSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
});

const appAdminModel = mongoose.model('app_admin', appAdminSchema);

module.exports = appAdminModel;