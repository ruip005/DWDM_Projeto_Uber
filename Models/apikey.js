const mongoose = require('mongoose');

const apikeySchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true 
    },
    key: { 
        type: String,
        required: true 
    },
});

const apikeyModel = mongoose.model('apikey', apikeySchema);

module.exports = apikeyModel;