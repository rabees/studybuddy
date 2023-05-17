const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stripeChargeId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'Instructor'
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
