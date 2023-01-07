const nodemailer = require('nodemailer');
const config = require('../aws_config');

const transporter = nodemailer.createTransport({
  host: config.ses.SMTP_HOST,
  port: 465,
  auth: {
    user: config.ses.SMTP_USER,
    pass: config.ses.SMTP_PASSWORD
  },
  secure: true
});

// AWS SES SMTP interface to send email
module.exports.sendEmail = async (toAddress, subject, htmlEmail, txtEmail) => {
  if (!subject || (!htmlEmail || !txtEmail)) {
    return { message: 'Missing required data to send email' };
  }

  try {
    const res = await transporter.sendMail({
      from: config.ses.FROM_EMAIL_ADDRESS,
      to: toAddress,
      subject,
      text: txtEmail,
      html: htmlEmail
    });
    console.log('---------------EMAIL SENT-----------');
    return res;
  } catch (error) {
    console.log('CONTROLLER SEND EMAIL ERROR', error);
    return error;
  }
};
