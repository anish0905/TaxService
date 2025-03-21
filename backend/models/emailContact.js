const mongoose = require('mongoose');

const emailContacts = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)
module.exports = emailContacts