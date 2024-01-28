const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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
  quantity: {
    type: Number,
    required: true
  },
  restaurantId: {
    type: String,
    required: true
  },
  itemImage: {
    type: String,
  },
});

const itemModel = mongoose.model('item', itemSchema);

module.exports = itemModel;