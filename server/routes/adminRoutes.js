const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Admin = require("../models/Admin");
const Contact = require("../models/Contact");
const Proposal = require("../models/Proposal");
const { requireAdmin } = require("../middleware/auth");

function signToken(admin) {
  return jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

/* ===================================
   Login (public)
=================================== */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = signToken(admin);

    return res.json({
      success: true,
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to log in right now.",
    });
  }
});

// Everything below this line requires a valid admin session.
router.use(requireAdmin);

/* ===================================
   Current Admin
=================================== */

router.get("/me", (req, res) => {
  res.json({ success: true, admin: req.admin });
});

/* ===================================
   Dashboard
=================================== */

router.get("/dashboard", async (req, res) => {
  try {
    const [totalContacts, totalProposals, latestContacts, latestProposals] =
      await Promise.all([
        Contact.countDocuments(),
        Proposal.countDocuments(),
        Contact.find().sort({ createdAt: -1 }).limit(5),
        Proposal.find().sort({ createdAt: -1 }).limit(5),
      ]);

    res.json({
      success: true,
      totalContacts,
      totalProposals,
      latestContacts,
      latestProposals,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to load dashboard data.",
    });
  }
});

/* ===================================
   Contacts
=================================== */

// Get All Contacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Get Contacts Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch contacts.",
    });
  }
});

// Delete Contact
router.delete("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

if (!contact) {
  return res.status(404).json({
    success: false,
    message: "Contact not found",
  });
}
    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to delete contact.",
    });
  }
});

/* ===================================
   Proposals
=================================== */

// Get All Proposals
router.get("/proposals", async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.json(proposals);
  } catch (error) {
    console.error("Get Proposals Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch proposals.",
    });
  }
});

// Delete Proposal
router.delete("/proposals/:id", async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);

if (!proposal) {
  return res.status(404).json({
    success: false,
    message: "Proposal not found",
  });
}

res.json({
  success: true,
  message: "Proposal deleted successfully",
});
  } catch (error) {
    console.error("Delete Proposal Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to delete proposal.",
    });
  }
});

module.exports = router;
