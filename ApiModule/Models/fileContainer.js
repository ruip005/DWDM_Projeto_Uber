const mongoose = require('mongoose');

const filecontainerSchema = new mongoose.Schema({
  dateCreated : {
    type: Date,
    default: Date.now
  },
});

const filecontainerModel = mongoose.model('file_container', filecontainerSchema);

module.exports = filecontainerModel;