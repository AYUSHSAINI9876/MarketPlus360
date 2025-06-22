const { Schema } = require("mongoose");

const PositionsSchema = new Schema({
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
});
<<<<<<< HEAD
=======

>>>>>>> a74997075c113219cec9ec343c9a1ed4c2a84c09
module.exports = { PositionsSchema };
