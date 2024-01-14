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
    DayOfWeek: {
      type: Number,
      required: true
    },
    Monday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    Tuesday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    Wednesday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    Thursday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    Friday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    Saturday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
    },
    Sunday: {
      open: {
        type: String,
        required: true
      },
      close: {
        type: String,
        required: true
      }
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boxes',
    required: false, 
    default: null
  },
  ContainerID: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'file_containers',
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