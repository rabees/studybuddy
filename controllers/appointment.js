const { Appointment, Slot } = require("../models/appointment");
// const nodemailer = require("nodemailer");

exports.getAllAppointments = (req, res) => {
  Appointment.find({}).exec((err, appointments) => {
    if (err) {
      return res.status(400).json({
        error: "No appointments found.",
      });
    }
    return res.json(appointments);
  });
};

exports.getAllSlots = (req, res) => {
  if (req.query.slotDate) {
    Slot.find({"slotDate": req.query.slotDate}).exec((err, slots) => {
      if (err) {
          return res.status(400).json({
              "error": "No slots found."
          });
      }
      return res.json(slots);
  });
  } else {
    Slot.find({}).exec((err, slots) => {
      if (err) {
          return res.status(400).json({
              "error": "No slots found."
          });
      }
      return res.json(slots);
  });
  }
};

exports.createAppointment = (req, res) => {
  var requestBody = req.body;
  var newSlot = new Slot({
    slotTime: requestBody.slots.slotTime,
    slotDate: requestBody.slots.slotDate,
    createdAt: Date.now(),
  });
  newSlot.save((err, saved) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save slot.",
      });
    }
  });

  // Creates a new record from a submitted form
  var newAppointment = new Appointment({
    name: requestBody.name,
    email: requestBody.email,
    phone: requestBody.phone,
    slots: newSlot._id,
  });

  // and saves the record to
  // the data base
  newAppointment.save((err, saved) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save appointment.",
      });
    }

    // Returns the saved appointment
    // after a successful save
    Appointment.find({ _id: saved._id })
      .populate("slots")
      .exec((err, appointment) => res.json(appointment));
    // let mailTransporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.GMAIL_ID,
    //     pass: process.env.GMAIL_PASS,
    //   },
    // });

    // let mailDetails = {
    //   from: process.env.GMAIL_ID,
    //   to: saved.email,
    //   subject: "Appointment Confirmation",
    //   text: `Hi ${saved.name},\nThis message is to confirm your appointment on ${newSlot.slotDate} at ${newSlot.slotTime}.`,
    // };

    // mailTransporter.sendMail(mailDetails, function (err, data) {
    //   if (err) {
    //     console.log(`Error occured while sending mail to ${saved.name} `);
    //   } else {
    //     console.log(`Email sent successfully to ${saved.name}`);
    //   }
    // });
  });
};
