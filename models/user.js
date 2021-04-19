const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  gender: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  age: {
    type: Number
    //required: true,
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

const User = mongoose.model("users", userschema);

module.exports = User;
