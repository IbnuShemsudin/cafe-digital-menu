import dns from "dns";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// =========================================================
// DNS CONFIGURATION
// MongoDB Atlas SRV DNS resolution
// =========================================================

dns.setServers([
  "8.8.8.8",
  "1.1.1.1",
]);

// =========================================================
// ENVIRONMENT VARIABLES
// =========================================================

dotenv.config();

// =========================================================
// DATABASE & ROUTES
// =========================================================

import connectDB from "./config/db.js";
import menuRoutes from "./routes/menuRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// =========================================================
// APP
// =========================================================

const app = express();

// =========================================================
// CORS
// =========================================================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// =========================================================
// BODY PARSERS
// =========================================================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// =========================================================
// HEALTH CHECK
// =========================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Cafe Menu API is running",
  });
});

// =========================================================
// ROUTES
// =========================================================

app.use("/api/auth", authRoutes);

app.use("/api/menu", menuRoutes);

// =========================================================
// 404
// =========================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =========================================================
// GLOBAL ERROR HANDLER
// =========================================================

app.use((error, req, res, next) => {
  console.error("Global server error:", error);

  if (error.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message:
        "The uploaded image is too large. Please choose an image smaller than 5 MB.",
    });
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
});

// =========================================================
// START SERVER
// =========================================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start Express only after DB connection succeeds
    app.listen(PORT, () => {
      console.log(`Cafe Menu API running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();