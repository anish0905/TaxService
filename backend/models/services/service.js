const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true ,unique:true },
    description: { type: String },
    category: { type: [String], unique:true }, // Ensuring category is an array of strings
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
