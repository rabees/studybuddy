const express = require("express");
const router = express.Router();

const { getAllAppointments, getAllSlots, createAppointment } = require("../../controllers/appointment");

router.get("/appointment", getAllAppointments);
router.post("/appointment", createAppointment);
router.get("/slot", getAllSlots);

module.exports = router;
