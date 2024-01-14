const mongoose = require('mongoose');

const fileContentSchema = new mongoose.Schema({
  binary: {
    type: String,
    required: true
  },
});

const fileContentModel = mongoose.model('file_content', fileContentSchema);

module.exports = fileContentModel;