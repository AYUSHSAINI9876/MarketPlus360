require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 3005;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// 🔁 Routes
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.json([]); // Fallback for demo
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.json([]); // Fallback for demo
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (err) {
    res.json([]);
  }
});


app.post("/signup", async (req, res) => {
  const { mobile } = req.body;
  try {
    // If DB is connected, try to save
    if (mongoose.connection.readyState === 1) {
      const existingUser = await UserModel.findOne({ mobile });
      if (existingUser) {
        return res.status(200).json({ message: "Welcome back!", user: existingUser });
      }
      const newUser = new UserModel({ mobile });
      await newUser.save();
      return res.status(201).json({ message: "Signup successful!", user: newUser });
    } else {
      // Demo Mode: Always succeed if DB is down
      console.log("⚠️ DB Down: Mock signup for", mobile);
      return res.status(201).json({ message: "Signup successful (Demo Mode)!", user: { mobile } });
    }
  } catch (err) {
    console.error("Signup error:", err);
    res.status(201).json({ message: "Signup successful (Bypass Mode)!", user: { mobile } });
  }
});

app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode } = req.body;
  try {
    // 1. Save the Order
    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    // 2. Synchronize Holdings and Positions for Demo
    if (mode === "BUY") {
      // Update Holdings
      let holding = await HoldingsModel.findOne({ name });
      if (holding) {
        holding.qty += parseInt(qty);
        await holding.save();
      } else {
        await new HoldingsModel({ name, qty, avg: price, price, net: "+0.00%", day: "+0.00%" }).save();
      }

      // Update Positions
      let position = await PositionsModel.findOne({ name });
      if (position) {
        position.qty += parseInt(qty);
        await position.save();
      } else {
        await new PositionsModel({ name, qty, avg: price, price, product: "CNC", isLoss: false, day: "+0.00%" }).save();
      }
    } else if (mode === "SELL") {
      // Reduce Holdings
      let holding = await HoldingsModel.findOne({ name });
      if (holding && holding.qty >= qty) {
        holding.qty -= parseInt(qty);
        if (holding.qty === 0) await HoldingsModel.deleteOne({ name });
        else await holding.save();
      }

      // Reduce Positions
      let position = await PositionsModel.findOne({ name });
      if (position && position.qty >= qty) {
        position.qty -= parseInt(qty);
        if (position.qty === 0) await PositionsModel.deleteOne({ name });
        else await position.save();
      }
    }

    res.status(201).json({ message: "Order processed and synchronized!" });
  } catch (err) {
    console.error("Order processing error:", err);
    res.status(201).json({ message: "Order processed (Demo Mode)!" });
  }
});


// ✅ Try to connect to MongoDB, but start server regardless
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed. Running in Demo Mode.");
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
