const { Schema } = require("mongoose");

const UserSchema = new Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  username: String,
  email: String,
});

module.exports = { UserSchema };
