const mongoose = require("mongoose");
const applyToJSON = require("../utils/applyToJSON");

const proposalSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    website: { type: String, trim: true, default: "" },
    service: { type: String, required: true, trim: true },
    budget: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

applyToJSON(proposalSchema);

module.exports = mongoose.model("Proposal", proposalSchema);
