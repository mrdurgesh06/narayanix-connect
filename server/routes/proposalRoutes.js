const express = require("express");
const router = express.Router();

const Proposal = require("../models/Proposal");
const { sendEmail } = require("../services/emailService");

// =======================================
// Submit Proposal (public — used by the
// website's Get Proposal page)
// =======================================

router.post("/", async (req, res) => {
  const { company, name, email, phone, website, service, budget, message } = req.body;

  if (!company || !name || !email || !phone || !service || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  try {
    const newProposal = await Proposal.create({
      company,
      name,
      email,
      phone,
      website: website || "",
      service,
      budget: budget || "",
      message,
    });

    // Best-effort admin notification — never blocks the response.
    if (process.env.EMAIL_USER && process.env.ADMIN_NOTIFY_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: "New Proposal Request — NARAYANIX Connect",
        html: `
          <h2>New Proposal Request</h2>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Website:</strong> ${website || "-"}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget || "-"}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }).catch(() => {});
    }

    return res.status(201).json({
      success: true,
      message: "Proposal submitted successfully.",
      data: newProposal,
    });
  } catch (error) {
    console.error("Create Proposal Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to submit your proposal.",
    });
  }
});

module.exports = router;
