const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  // 🔍 Safety check (helps catch env issues early)
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are missing in environment variables');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true only for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // ✅ Optional but very useful: verifies SMTP before sending
  await transporter.verify();

  await transporter.sendMail({
    from: `"Girish More" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
};

module.exports = sendEmail;
