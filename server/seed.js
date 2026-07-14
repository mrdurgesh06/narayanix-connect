// One-time setup script.
// Run with: npm run seed
//
// - Creates the first admin login (from ADMIN_EMAIL / ADMIN_PASSWORD in .env,
//   or sensible defaults if not set) — skipped if an admin already exists.
// - Seeds the Settings and WebsiteContent singleton documents from
//   server/data/*.json (the site's existing content) if present, otherwise
//   from the built-in defaults. Skipped if they're already seeded.
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");
const Settings = require("./models/Settings");
const WebsiteContent = require("./models/WebsiteContent");

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return raw.trim() ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function seedAdmin() {
  const existing = await Admin.countDocuments();

  if (existing > 0) {
    console.log("ℹ️  Admin user already exists — skipping.");
    return;
  }

  const email = process.env.ADMIN_EMAIL || "admin@narayanixconnect.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@123";

  await Admin.create({ name: "Administrator", email, password });

  console.log("✅ Admin user created:");
  console.log(`   Email:    ${email}`);
  console.log(`   Password: ${password}`);
  console.log("   ⚠️  Log in and change this password (or set ADMIN_EMAIL / ADMIN_PASSWORD in .env before seeding).");
}

async function seedSettings() {
  const existing = await Settings.findOne();
  if (existing) {
    console.log("ℹ️  Settings already seeded — skipping.");
    return;
  }

  const fromFile = readJsonIfExists(path.join(__dirname, "data", "settings.json"));
  await Settings.create(fromFile || {});
  console.log("✅ Settings seeded.");
}

async function seedWebsiteContent() {
  const existing = await WebsiteContent.findOne();
  if (existing) {
    console.log("ℹ️  Website content already seeded — skipping.");
    return;
  }

  const fromFile = readJsonIfExists(path.join(__dirname, "data", "websiteContent.json"));
  await WebsiteContent.create(fromFile || WebsiteContent.defaultContent);
  console.log("✅ Website content seeded.");
}

async function run() {
  await connectDB();

  await seedAdmin();
  await seedSettings();
  await seedWebsiteContent();

  console.log("🌱 Seeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
