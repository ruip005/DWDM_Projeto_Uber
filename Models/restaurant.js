const mongoose = require('mongoose');

const restauranteSchema = new mongoose.Schema({
  companyName: { 
    type: String,
    required: true 
  },
  companyRating: Number,
  deliveryFee: Number,
  businessHours: {
    Monday: { 
      type: String, 
      required: true
    },
    Tuesday: { 
      type: String, 
      required: true 
    },
    Wednesday: { 
      type: String, 
      required: true 
    },
    Thursday: { 
      type: String, 
      required: true 
    },
    Friday: { 
      type: String, 
      required: true 
    },
    Saturday: { 
      type: String, 
      required: true 
    },
    Sunday: { 
      type: String, 
      required: true 
    }
  },
  contactEmail: { 
    type: String, 
    required: true 
  },
  contactPhone: { 
    type: String, 
    required: true 
  },
  deliversToHome: { 
    type: Boolean, 
    default: false 
  },
  BoxID: { 
    type: String, 
    required: true 
  },
  ContainerID: { 
    type: String, 
    required: true 
  },
  Address: { 
    type: String, 
    required: true 
  }
});

const restauranteModel = mongoose.model('restaurants', restauranteSchema);

module.exports = restauranteModel;