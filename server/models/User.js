// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpiry: Date,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.createResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetTokenExpiry = Date.now() + 3600000;
    return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;