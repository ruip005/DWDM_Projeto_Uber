const mongoose = require('mongoose');

const apikeySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
    },
    key: { 
        type: String,
        required: true 
    },
});

const apikeyModel = mongoose.model('apikey', apikeySchema);

module.exports = apikeyModel;