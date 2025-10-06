const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,     // Gmail ของคุณ
      pass: process.env.SMTP_PASSWORD,  // App Password ของ Gmail
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,     // string หรือ "a@gmail.com, b@gmail.com"
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

const sendVerificationEmail = async (email, verificationToken) => {
  const message = `
  Welcome to VacQ!
  
  Please verify your email using the verification token below:
  
  Verification Token: ${verificationToken}
  
  Use this token to verify your account through the API endpoint:
  POST /api/v1/auth/verify
  
  Body:
  {
    "email": "${email}",
    "verificationToken": "${verificationToken}"
  }
  
  If you did not create an account, please ignore this email.
  This token will expire in 1 hour.
  `;

  await sendEmail({
    email: email,
    subject: 'VacQ - Email Verification Token',
    message: message,
  });
};

module.exports = { sendEmail, sendVerificationEmail };
