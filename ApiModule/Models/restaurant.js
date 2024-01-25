const mongoose = require("mongoose");

const restauranteSchema = new mongoose.Schema({
  campanyName: {
    type: String,
    required: true,
  },
  deliveryFee: {
    type: Number,
    required: true,
  },
  businessHours: {
    Monday: {
      open: {
        type: String,
        required: false,
      },
      close: {
        type: String,
        required: false,
      },
    },
    Tuesday: {
      open: {
        type: String,
        required: false,
      },
      close: {
        type: String,
        required: false,
      },
    },
    Wednesday: {
      open: {
        type: String,
        required: false,
      },
      close: {
        type: String,
        required: false,
      },
    },
    Thursday: {
      open: {
        type: String,
        required: false,
      },
      close: {
        type: String,
        required: false,
      },
    },
    Friday: {
      open: {
        type: String,
        required: false,
      },
      close: {
        type: String,
        required: false,
      },
    },
    Saturday: {
      open: {
        type: String,
        required: false,
      },
      close: {
        type: String,
        required: false,
      },
    },
    Sunday: {
      open: {
        type: String,
        required: false,
      },
      close: {
        type: String,
        required: false,
      },
    },
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  deliversToHome: {
    type: Boolean,
    default: false,
  },
  BoxID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "boxes",
    required: false,
    default: null,
  },
  ContainerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "file_containers",
    required: false,
    default: null,
  },
  Address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
});

const restauranteModel = mongoose.model("restaurants", restauranteSchema);

module.exports = restauranteModel;
