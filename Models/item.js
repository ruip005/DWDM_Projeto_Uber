const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  boxId: { 
    type: String,
    required: true 
  },
  itemName: {
    type: String,
    required: true
  },
  itemDescription: {
    type: String,
    required: false
  },
  itemPrice: {
    type: Number,
    required: true
  },
  itemImage: {
    type: String,
    required: true
  },
  itemType: {
    type: String,
    required: true
  },
});

const itemModel = mongoose.model('item', itemSchema);

module.exports = itemModel;