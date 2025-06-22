const { model } = require("mongoose");

const { HoldingsSchema } = require("../schemas/HoldingsSchema");

const HoldingsModel = new model("holding", HoldingsSchema);
<<<<<<< HEAD
=======

>>>>>>> a74997075c113219cec9ec343c9a1ed4c2a84c09
module.exports = { HoldingsModel };
