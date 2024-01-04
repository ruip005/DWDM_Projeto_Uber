const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileName: { 
        type: String,
        required: false 
    },
    fileFormat: {
        type: String,
        required: false
    },
    fileSize: {
        type: Number,
        required: false
    },
    fileContainerId: {
        type: String,
        required: true
    },
    fileContentId: {
        type: String,
        required: true
    },
});

const fileModel = mongoose.model('file', fileSchema);

module.exports = fileModel;