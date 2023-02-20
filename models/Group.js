const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true
    },
    groupDescription: {
      type: String,
      required: true
    },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.String, ref: "Category" }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = Group = mongoose.model("groups", GroupSchema);
