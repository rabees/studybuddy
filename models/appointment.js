const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const SlotSchema = new mongoose.Schema({
  slotTime: String,
  slotDate: String,
  instructor: {
    type: ObjectId,
    ref: "Instructor",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Slot = mongoose.model("Slot", SlotSchema);

const AppointmentSchema = new mongoose.Schema({
  student: {
    type: ObjectId,
    ref: "Student",
    required: true
  },
  slot: {
    type: ObjectId,
    ref: "Slot",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = { Appointment, Slot };
