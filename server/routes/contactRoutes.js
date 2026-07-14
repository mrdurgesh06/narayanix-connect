const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const { sendEmail } = require("../services/emailService");

// =======================================
// Submit Contact (public — used by the
// website's Contact page)
// =======================================

router.post("/", async (req, res) => {
  const { name, company, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  try {
    const newContact = await Contact.create({
      name,
      company: company || "",
      email,
      phone,
      message,
    });

    // Best-effort admin notification — never blocks the response.
    if (process.env.EMAIL_USER && process.env.ADMIN_NOTIFY_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: "New Contact Enquiry — NARAYANIX Connect",
        html: `
          <h2>New Contact Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company || "-"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }).catch(() => {});
    }

    return res.status(201).json({
      success: true,
      message: "Message submitted successfully.",
      data: newContact,
    });
  } catch (error) {
    console.error("Create Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to submit your message.",
    });
  }
});

module.exports = router;
