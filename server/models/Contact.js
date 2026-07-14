const mongoose = require("mongoose");
const applyToJSON = require("../utils/applyToJSON");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: "" },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

applyToJSON(contactSchema);

module.exports = mongoose.model("Contact", contactSchema);
