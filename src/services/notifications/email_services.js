const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diasazril223@gmail.com',
    pass: 'jkrl hnyf ljan ndjk'
  }
});

const sendEmail = (to, subject, text) => {
  return transporter.sendMail({ from: 'diasazril223@gmail.com', to, subject, text });
};

module.exports = { sendEmail };
