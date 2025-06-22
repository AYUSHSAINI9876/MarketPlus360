const { model } = require("mongoose");

const { PositionsSchema } = require("../schemas/PositionsSchema");

const PositionsModel = new model("position", PositionsSchema);
<<<<<<< HEAD
=======

>>>>>>> a74997075c113219cec9ec343c9a1ed4c2a84c09
module.exports = { PositionsModel };
