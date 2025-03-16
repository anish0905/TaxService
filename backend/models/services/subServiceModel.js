const mongoose = require('mongoose');

const subServiceSchema = new mongoose.Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }, // Reference to Service
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }, // Optional field for pricing
   
}, { timestamps: true });

module.exports = mongoose.model('SubService', subServiceSchema);
