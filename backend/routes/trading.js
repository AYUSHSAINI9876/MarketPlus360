const express = require("express");

const { HoldingsModel } = require("../model/HoldingsModel");
const { PositionsModel } = require("../model/PositionsModel");
const { OrdersModel } = require("../model/OrdersModel");
const { FundsModel } = require("../model/FundsModel");
const { requireAuth } = require("../middleware/auth");
const { ensureDB } = require("../utils/db");

const router = express.Router();

router.use(requireAuth);
router.use(ensureDB);

async function getOrCreateFunds(userId) {
  let funds = await FundsModel.findOne({ userId });
  if (!funds) {
    funds = await new FundsModel({ userId }).save();
  }
  return funds;
}

router.get("/holdings", async (req, res, next) => {
  try {
    const holdings = await HoldingsModel.find({ userId: req.userId });
    res.json(holdings);
  } catch (err) {
    next(err);
  }
});

router.get("/positions", async (req, res, next) => {
  try {
    const positions = await PositionsModel.find({ userId: req.userId });
    res.json(positions);
  } catch (err) {
    next(err);
  }
});

router.get("/orders", async (req, res, next) => {
  try {
    const orders = await OrdersModel.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/funds", async (req, res, next) => {
  try {
    const funds = await getOrCreateFunds(req.userId);
    res.json(funds);
  } catch (err) {
    next(err);
  }
});

router.post("/funds/add", async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: "Enter a valid amount to add." });
    }
    const funds = await getOrCreateFunds(req.userId);
    funds.balance += amount;
    await funds.save();
    res.json(funds);
  } catch (err) {
    next(err);
  }
});

router.post("/funds/withdraw", async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: "Enter a valid amount to withdraw." });
    }
    const funds = await getOrCreateFunds(req.userId);
    if (amount > funds.balance) {
      return res.status(400).json({ message: "Withdrawal amount exceeds available balance." });
    }
    funds.balance -= amount;
    await funds.save();
    res.json(funds);
  } catch (err) {
    next(err);
  }
});

router.post("/orders", async (req, res, next) => {
  try {
    const userId = req.userId;
    const name = (req.body.name || "").trim();
    const qty = parseInt(req.body.qty, 10);
    const price = parseFloat(req.body.price);
    const mode = req.body.mode === "SELL" ? "SELL" : "BUY";

    if (!name) {
      return res.status(400).json({ message: "Missing instrument name." });
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive whole number." });
    }
    if (!Number.isFinite(price) || price <= 0) {
      return res.status(400).json({ message: "Price must be greater than zero." });
    }

    const orderValue = qty * price;
    const funds = await getOrCreateFunds(userId);

    if (mode === "BUY") {
      if (orderValue > funds.balance) {
        return res.status(400).json({ message: "Insufficient funds for this order." });
      }

      funds.balance -= orderValue;
      await funds.save();

      let holding = await HoldingsModel.findOne({ userId, name });
      if (holding) {
        const totalCost = holding.avg * holding.qty + orderValue;
        holding.qty += qty;
        holding.avg = totalCost / holding.qty;
        holding.price = price;
        await holding.save();
      } else {
        await new HoldingsModel({ userId, name, qty, avg: price, price, net: "+0.00%", day: "+0.00%" }).save();
      }

      let position = await PositionsModel.findOne({ userId, name });
      if (position) {
        const totalCost = position.avg * position.qty + orderValue;
        position.qty += qty;
        position.avg = totalCost / position.qty;
        position.price = price;
        await position.save();
      } else {
        await new PositionsModel({ userId, name, qty, avg: price, price, product: "CNC", isLoss: false, day: "+0.00%" }).save();
      }
    } else {
      const holding = await HoldingsModel.findOne({ userId, name });
      if (!holding || holding.qty < qty) {
        return res.status(400).json({ message: `You don't have enough ${name} to sell.` });
      }

      holding.qty -= qty;
      if (holding.qty === 0) {
        await HoldingsModel.deleteOne({ userId, name });
      } else {
        holding.price = price;
        await holding.save();
      }

      const position = await PositionsModel.findOne({ userId, name });
      if (position && position.qty >= qty) {
        position.qty -= qty;
        if (position.qty === 0) {
          await PositionsModel.deleteOne({ userId, name });
        } else {
          position.price = price;
          await position.save();
        }
      }

      funds.balance += orderValue;
      await funds.save();
    }

    const order = await new OrdersModel({ userId, name, qty, price, mode }).save();
    res.status(201).json({ message: "Order executed successfully.", order, balance: funds.balance });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
