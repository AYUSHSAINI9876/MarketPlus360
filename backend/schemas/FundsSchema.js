const { Schema } = require("mongoose");

const FundsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 100000,
  },
});

module.exports = { FundsSchema };
