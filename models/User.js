// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  // Add more fields as needed
});

module.exports = mongoose.model('User', userSchema);
