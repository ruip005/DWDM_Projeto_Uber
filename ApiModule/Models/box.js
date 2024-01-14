const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  dateCreated : {
    type: Date,
    default: Date.now
  },
});

const boxModel = mongoose.model('boxes', boxSchema);

module.exports = boxModel;