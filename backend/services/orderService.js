const Order = require('../models/ordersModel')
const emailService = require('./emailService');
const fs = require('fs').promises;
const accountSid = 'AC15b7cd1b3d11fa5ac53ea51038a9d85f'
const authToken = '147adb43fbbb552875088eaf3f209a72'

const client = require('twilio')(accountSid,authToken);

const sendTwilioMessage = async (to, body) => {
  try {
    const message = await client.messages.create({
      to,
      from: '+18669718120',
      body,
    });
    console.log('Twilio message sent successfully. SID:', message.sid);

  } catch (error) {
    console.error(`Error sending Twilio message: ${error.message}`);
  }
};

const updateOrderStatusService = async (orderId, status) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {status: status} 
    );

      if (!updatedOrder) {
        throw new Error('Order not found');
      }

      const emailSubject = 'Order Status Update';
      const recipientEmail = 'adapachinnu28@gmail.com';


      if (status === 'order confirmed' ) {
        const filePath = `./html/orderConfirmed.html`;
        emailHTML = await fs.readFile(filePath, 'utf-8');
        console.log(emailHTML)
        await emailService.sendEmail(recipientEmail, emailSubject, emailHTML);
        const twilioMessage = `Great news! Your order has been confirmed, and we're getting everything ready for you. Stay tuned for further updates!`;
      await sendTwilioMessage('+18577537075', twilioMessage);
      }
      else if (status === 'out for delivery' ) {
        const filePath = `./html/outForDelivery.html`;
        emailHTML = await fs.readFile(filePath, 'utf-8');
        console.log(emailHTML)
        await emailService.sendEmail(recipientEmail, emailSubject, emailHTML);
        const twilioMessage = `Exciting news! Your order is out for delivery. Keep an eye out for our delivery team!`;
        await sendTwilioMessage('+18577537075', twilioMessage);
      }
      else if (status === 'order delivered' ) {
        const filePath = `./html/orderDelivered.html`;
        emailHTML = await fs.readFile(filePath, 'utf-8');
        console.log(emailHTML)
        await emailService.sendEmail(recipientEmail, emailSubject, emailHTML);
        const twilioMessage = `Great news! Your order has been confirmed, and we're getting everything ready for you. Stay tuned for further updates!`;
        await sendTwilioMessage('+18577537075', twilioMessage);
      }
  
      return updatedOrder;
    } catch (error) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
};
  
module.exports={
updateOrderStatusService
}