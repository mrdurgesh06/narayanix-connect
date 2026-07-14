const mongoose = require("mongoose");
const applyToJSON = require("../utils/applyToJSON");

// Settings is a singleton collection — there is always exactly one document.
const settingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: "NARAYANIX Connect" },
    email: { type: String, default: "info@narayanixconnect.com" },
    phone: { type: String, default: "+91 XXXXX XXXXX" },
    address: { type: String, default: "India" },
    workingHours: { type: String, default: "Monday - Saturday | 9:00 AM - 6:00 PM" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    copyright: { type: String, default: "© 2026 NARAYANIX Connect" },
    googleMap: { type: String, default: "" },
    analytics: { type: String, default: "" },
  },
  { timestamps: true }
);

applyToJSON(settingsSchema);

// Always returns the single settings document, creating it with
// defaults the first time it's requested.
settingsSchema.statics.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create({});
  }
  return doc;
};

module.exports = mongoose.model("Settings", settingsSchema);
