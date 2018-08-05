const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  }
});

const User = mongoose.model('User', UserSchema)

module.exports = { User }
