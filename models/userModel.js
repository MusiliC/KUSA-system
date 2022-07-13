const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  number: {
    type: String,
    minlength: 8
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

exports.User = User;
