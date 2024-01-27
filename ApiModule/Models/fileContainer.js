const mongoose = require("mongoose");

const filecontainerSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  binaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "file_content",
    required: false,
    default: null,
  },
});

const filecontainerModel = mongoose.model(
  "file_container",
  filecontainerSchema
);

module.exports = filecontainerModel;
