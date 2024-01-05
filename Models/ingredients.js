const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  ingredientName: {
    type: String,
    required: true
  },
  ingredientDescription: {
    type: String,
    required: false
  },
  fileContentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file_content',
    required: true
  },
  creatorWhoAdded: {
    type: String,
    required: true
  },
});

const ingredientsModel = mongoose.model('ingredients', ingredientsSchema);

module.exports = ingredientsModel;