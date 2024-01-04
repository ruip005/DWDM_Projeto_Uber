const mongoose = require('mongoose');

const restauranteSchema = new mongoose.Schema({
  campanyName: { 
    type: String,
    required: true 
  },
  deliveryFee: {
      type: Number,
      required: true
    },
  businessHours: {
    Monday: { 
      type: Array, 
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
    required: false, 
    default: null
  },
  ContainerID: { 
    type: String, 
    required: false,
    default: null
  },
  Address: { 
    type: String, 
    required: true 
  }
});

const restauranteModel = mongoose.model('restaurants', restauranteSchema);

module.exports = restauranteModel;