const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files from current directory

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Will be set in .env file
        pass: process.env.EMAIL_PASS  // Will be set in .env file (app password for Gmail)
    }
});

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    try {
        // Email to portfolio owner
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'sanketkothiya88@gmail.com', // Your email address
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
        };

        // Auto-reply to the sender
        const autoReplyOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting Sanket Kothiya',
            html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>I appreciate you contacting me. I have received your message and will get back to you as soon as possible.</p>
        <p>Here's a summary of what you submitted:</p>
        <p><strong>Message:</strong> ${message}</p>
        <br/>
        <p>Best regards,</p>
        <p>Sanket Kothiya</p>
      `
        };

        // Send emails
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(autoReplyOptions);

        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 