const path = require("path");
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const contactRoutes = require("./routes/contactRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const adminRoutes = require("./routes/adminRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const websiteContentRoutes = require("./routes/websiteContentRoutes");

const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const app = express();

// ================================
// Middlewares
// ================================
// ================================
// Security Middlewares
// ================================

app.use(helmet());

app.use(compression());

app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ================================
// Home Route
// ================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 NARAYANIX Connect API Running Successfully",
  });
});

// ================================
// API Routes
// ================================
app.use("/contact", contactRoutes);
app.use("/proposal", proposalRoutes);
app.use("/admin", adminRoutes);
app.use("/settings", settingsRoutes);
app.use("/upload", uploadRoutes);
app.use("/website-content", websiteContentRoutes);

// ================================
// 404 Handler
// ================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ================================
// Start Server (only after MongoDB connects)
// ================================
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("====================================");
    console.log(`✅ Server Running on Port ${PORT}`);
    console.log("🚀 NARAYANIX Connect Backend Ready");
    console.log("====================================");
  });
});
