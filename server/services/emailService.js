// server/services/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Send an email
 * @param {string} to - The recipient's email address
 * @param {string} subject - The subject of the email
 * @param {string} html - The HTML content of the email
 */
const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            to,
            from: process.env.EMAIL_USER,
            subject,
            html
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports = { sendEmail };