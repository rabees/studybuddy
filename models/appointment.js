const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SlotSchema = new mongoose.Schema({
  slotTime: String,
  slotDate: String,
  createdAt: Date,
});

const Slot = mongoose.model("Slot", SlotSchema);

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  slots: {
    type: ObjectId,
    ref: "Slot",
  },
  createdAt: Date,
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = { Appointment, Slot };
