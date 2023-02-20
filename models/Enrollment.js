const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema(
  {
    no: {
      type: Number,
      default: 1,
      required: false
    },
    student: { type: Schema.Types.ObjectId, ref: "User" },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    approved: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = Enrollment = mongoose.model("enrollments", EnrollmentSchema);
