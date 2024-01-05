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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file_containers',
        required: true
    },
    fileContentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file_content',
        required: true
    },
});

const fileModel = mongoose.model('file', fileSchema);

module.exports = fileModel;