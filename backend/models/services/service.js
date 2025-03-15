const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    imageUrl: { type: String },
    name: { type: String, unique: true,  },
    description: { type: String},
    category: { type: String, required: true }, // Ensure it's not unique
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
