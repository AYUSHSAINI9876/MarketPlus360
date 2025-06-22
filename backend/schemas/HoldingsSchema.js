const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
});
<<<<<<< HEAD
=======

>>>>>>> a74997075c113219cec9ec343c9a1ed4c2a84c09
module.exports = { HoldingsSchema };
