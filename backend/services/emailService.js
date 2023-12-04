const nodemailer = require('nodemailer');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'anushakadali09@gmail.com',
        pass: 'yylf volk mzmv eclc'
    }
});

const sendEmail = async (recipient, subject, emailHTML) => {
  try{

      await transporter.sendMail({
        from: 'anushakadali09@gmail.com',
        to: recipient,
        subject: subject,
        html: emailHTML,
      });
  
      console.log(`Email sent to ${recipient}`);
    } catch (error) {
      console.error(`Error sending email: ${error.message}`);
    }
  };
  
  module.exports = {
    sendEmail,
  };

