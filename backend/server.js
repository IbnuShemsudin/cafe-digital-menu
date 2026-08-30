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

const allowedOrigins = [
  // ---------------------------------------------------------
  // Local development
  // ---------------------------------------------------------
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  // ---------------------------------------------------------
  // CURRENT PRODUCTION DOMAIN
  // ---------------------------------------------------------
  "https://hodadis-menu.vercel.app",

  // ---------------------------------------------------------
  // OLD VERCEL DOMAINS
  // Keep these temporarily while migrating
  // ---------------------------------------------------------
  "https://cafe-digital-menu-eta.vercel.app",
  "https://cafe-digital-menu-qzr13byva-abdurezaks-projects.vercel.app",
];

// =========================================================
// CORS MIDDLEWARE
// =========================================================

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header.
      // Useful for Postman, Thunder Client,
      // server-to-server requests, etc.
      if (!origin) {
        return callback(null, true);
      }

      // Allow approved origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log(
        "CORS blocked origin:",
        origin
      );

      return callback(
        new Error(
          `CORS blocked origin: ${origin}`
        )
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
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

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "Cafe Menu API is running",
    });
  }
);

// =========================================================
// ROUTES
// =========================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/menu",
  menuRoutes
);

// =========================================================
// 404
// =========================================================

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  }
);

// =========================================================
// GLOBAL ERROR HANDLER
// =========================================================

app.use(
  (error, req, res, next) => {
    console.error(
      "Global server error:",
      error
    );

    // -------------------------------------------------------
    // Request body too large
    // -------------------------------------------------------

    if (
      error.type ===
      "entity.too.large"
    ) {
      return res.status(413).json({
        success: false,
        message:
          "The uploaded image is too large. Please choose an image smaller than 5 MB.",
      });
    }

    // -------------------------------------------------------
    // CORS error
    // -------------------------------------------------------

    if (
      error.message?.startsWith(
        "CORS blocked"
      )
    ) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    // -------------------------------------------------------
    // General error
    // -------------------------------------------------------

    res.status(
      error.status || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Internal server error",
    });
  }
);

// =========================================================
// START SERVER
// =========================================================

const PORT =
  process.env.PORT || 5000;

const startServer = async () => {
  try {
    // -------------------------------------------------------
    // Connect to MongoDB first
    // -------------------------------------------------------

    await connectDB();

    // -------------------------------------------------------
    // Start Express
    // -------------------------------------------------------

    app.listen(
      PORT,
      () => {
        console.log(
          `Cafe Menu API running on port ${PORT}`
        );

        console.log(
          `Environment: ${
            process.env.NODE_ENV ||
            "development"
          }`
        );

        console.log(
          "Allowed CORS origins:"
        );

        allowedOrigins.forEach(
          (origin) =>
            console.log(
              `  ✓ ${origin}`
            )
        );
      }
    );
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
