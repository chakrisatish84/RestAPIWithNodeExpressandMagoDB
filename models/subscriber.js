const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  joinedDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports= mongoose.model('Subscriber', subscriberSchema)
