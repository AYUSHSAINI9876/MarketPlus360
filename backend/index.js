require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth");
const tradingRoutes = require("./routes/trading");

const PORT = process.env.PORT || 3005;

if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET is not set. Add it to backend/.env before starting the server.");
  process.exit(1);
}

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  console.warn(
    "WARNING: ALLOWED_ORIGINS is not set — allowing all origins. Set it in production."
  );
}

app.use(
  cors({
    origin: allowedOrigins.length === 0 ? true : allowedOrigins,
    credentials: false,
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());

// Health check must always respond, even when the DB is unreachable, so it can
// report real status instead of depending on it.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", dbConnected: require("mongoose").connection.readyState === 1 });
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again later." },
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api", tradingRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Centralized error handler (must be last).
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Something went wrong." });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
