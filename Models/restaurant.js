const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companyRating: {
    type: Number,
    min: 0,
    max: 5
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  businessHours: {
    type: {
      Monday: String,
      Tuesday: String,
      Wednesday: String,
      Thursday: String,
      Friday: String,
      Saturday: String,
      Sunday: String
    }
  },
  contact: {
    email: String,
    phone: String
  },
  address: {
    type: String
  },
  deliversToHome: {
    type: Boolean,
    default: false
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
