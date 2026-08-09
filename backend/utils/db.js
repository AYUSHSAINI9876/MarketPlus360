const mongoose = require("mongoose");

let connectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI)
      .then((conn) => {
        console.log("MongoDB connected");
        return conn;
      })
      .catch((err) => {
        connectionPromise = null;
        console.error("MongoDB connection failed:", err.message);
        throw err;
      });
  }

  return connectionPromise;
}

async function ensureDB(req, res, next) {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(503).json({ message: "Database unavailable. Please try again shortly." });
  }
}

module.exports = { connectDB, ensureDB };
