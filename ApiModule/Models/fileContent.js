const mongoose = require("mongoose");

const fileContentSchema = new mongoose.Schema({
  img: {
    type: Buffer,
    required: true,
  },
});

const fileContentModel = mongoose.model("file_content", fileContentSchema);

module.exports = fileContentModel;
