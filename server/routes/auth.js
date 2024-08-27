const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const router = express.Router();
const crypto = require('crypto');
const validateExpirationTime = require('../utils/validateExpirationTime');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts from this IP, please try again later.'
});

const forgotPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many password reset requests from this IP, please try again later.'
});

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email ID already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const expirationTime = validateExpirationTime(process.env.JWT_SECRET_EXPIRE);
        const token = jwt.sign({ name, email }, process.env.JWT_SECRET, { expiresIn: expirationTime });

        res.status(201).json({ message: 'User created', user: { email, name, token } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const userDetails = { name: user.name, email: user.email };
        const expirationTime = validateExpirationTime(process.env.JWT_SECRET_EXPIRE);
        const token = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: expirationTime });

        res.json({ user: { ...userDetails, token } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/forgot-password', forgotPasswordLimiter, async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = user.createResetToken();
        await user.save();

        const resetURL = `${process.env.APP_URL}/reset-password/${resetToken}`;
        const subject = 'Password Reset';
        const text = `<p>You requested a password reset. Click <a href="${resetURL}">here</a> to reset your password. This link is valid for 1 hour.</p>`;

        await sendEmail(user.email, subject, text);

        res.status(200).json({ message: 'Email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        const userDetails = { name: user.name, email: user.email };
        const expirationTime = validateExpirationTime(process.env.JWT_SECRET_EXPIRE);
        const userToken = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: expirationTime });

        res.status(200).json({ message: 'Password reset successfully', user: { ...userDetails, token: userToken } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;