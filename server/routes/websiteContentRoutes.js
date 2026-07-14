const express = require("express");
const router = express.Router();

const WebsiteContent = require("../models/WebsiteContent");
const { requireAdmin } = require("../middleware/auth");

// =======================================
// GET Website Content (public — every
// public page reads its copy from here)
// =======================================

router.get("/", async (req, res) => {
  try {
    const content = await WebsiteContent.getSingleton();
    return res.status(200).json(content);
  } catch (error) {
    console.error("Read Website Content Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load website content.",
    });
  }
});

// =======================================
// SAVE Website Content (admin only)
// =======================================

router.post("/", requireAdmin, async (req, res) => {
  try {
    const existing = await WebsiteContent.getSingleton();

    const updated = await WebsiteContent.findByIdAndUpdate(
      existing._id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Website content saved successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("Save Website Content Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to save website content.",
    });
  }
});

module.exports = router;
