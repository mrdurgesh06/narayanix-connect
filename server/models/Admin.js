const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const applyToJSON = require("../utils/applyToJSON");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Administrator" },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Never send the password hash back to the client.
applyToJSON(adminSchema, ["password"]);

adminSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);
