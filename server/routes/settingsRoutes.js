const express = require("express");
const router = express.Router();

const Settings = require("../models/Settings");
const { requireAdmin } = require("../middleware/auth");

// =======================================
// GET Settings (public — the site's
// header/footer/contact info depend on it)
// =======================================

router.get("/", async (req, res) => {
  try {
    const settings = await Settings.getSingleton();
    return res.status(200).json(settings);
  } catch (error) {
    console.error("Read Settings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load settings.",
    });
  }
});

// =======================================
// SAVE Settings (admin only)
// =======================================

router.post("/", requireAdmin, async (req, res) => {
  try {
    const current = await Settings.getSingleton();

    Object.assign(current, req.body);
    await current.save();

    return res.status(200).json({
      success: true,
      message: "Settings saved successfully.",
      data: current,
    });
  } catch (error) {
    console.error("Save Settings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to save settings.",
    });
  }
});

module.exports = router;
