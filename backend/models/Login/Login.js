const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const LoginSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true,
            enum: ['Admin', 'subAdmin'],
            default: 'subAdmin'  
         },
        isActive: { type: Boolean, default: true },
      
        createdAt: { type: Date, default: Date.now }
    }
);

// Hash password before saving
LoginSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Corrected comparePassword method
LoginSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('Login', LoginSchema);
