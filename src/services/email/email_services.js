const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diasazril223@gmail.com',
    pass: 'jant dolo vxcx yedv'
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'diasazril223@gmail.com',
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };

