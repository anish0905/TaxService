const mongoose = require("mongoose");

const emailContactSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("EmailContact", emailContactSchema);
