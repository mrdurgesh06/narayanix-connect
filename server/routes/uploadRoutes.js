const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const { requireAdmin } = require("../middleware/auth");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    // Bust any cached copy of the previous logo/favicon.
    cb(null, `${req.params.type}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Upload Logo / Favicon (admin only)

router.post("/:type", requireAdmin, upload.single("image"), (req, res) => {
  const { type } = req.params;

  if (type !== "logo" && type !== "favicon") {
    return res.status(400).json({
      success: false,
      message: "Invalid upload type",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  return res.json({
    success: true,
    image: imageUrl,
  });
});

module.exports = router;
