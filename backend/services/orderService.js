const Order = require('../models/ordersModel')
const emailService = require('./emailService');
const userController = require('../controllers/userController')
const fs = require('fs').promises;
var dotenv = require('dotenv');
dotenv.config();

const client = require('twilio')(process.env.ACCOUNT_SID,process.env.AUTH_TOKEN);

const sendTwilioMessage = async (to, body) => {
  try {
    const message = await client.messages.create({
      to,
      from: '+18556656798',
      body,
    });
    console.log('Twilio message sent successfully. SID:', message.sid);

  } catch (error) {
    console.error(`Error sending Twilio message: ${error}`);
  }
};

const updateOrderStatusService = async (orderId, status) => {
    try {
      console.log("status", status);
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {status: status},
        { new: true }  
    );

      if (!updatedOrder) {
        throw new Error('Order not found');
      }

      console.log(updatedOrder);

      
      console.log("updatedOrder ", updatedOrder);
      const userId = updatedOrder.userId; // Convert userId to string
     
    const user = await userController.getUser(userId); // Convert string to ObjectId
    console.log("user ", user);  
    const recipientEmail = user.email;
      const emailSubject = 'Order Status Update';


      if (status === 'order confirmed' ) {
        const filePath = `./html/orderConfirmed.html`;
        emailHTML = await fs.readFile(filePath, 'utf-8');
        console.log(emailHTML)
        await emailService.sendEmail(recipientEmail, emailSubject, emailHTML);
        const twilioMessage = `Great news! Your order has been confirmed, and we're getting everything ready for you. Stay tuned for further updates!`;
      await sendTwilioMessage('+17744868766', twilioMessage);
      }
      else if (status === 'out for delivery' ) {
        const filePath = `./html/outForDelivery.html`;
        emailHTML = await fs.readFile(filePath, 'utf-8');
        console.log(emailHTML)
        await emailService.sendEmail(recipientEmail, emailSubject, emailHTML);
        const twilioMessage = `Exciting news! Your order is out for delivery. Keep an eye out for our delivery team!`;
        await sendTwilioMessage('+17744868766', twilioMessage);
      }
      else if (status === 'delivered' ) {
        const filePath = `./html/orderDelivered.html`;
        emailHTML = await fs.readFile(filePath, 'utf-8');
        console.log(emailHTML)
        await emailService.sendEmail(recipientEmail, emailSubject, emailHTML);
        const twilioMessage = `Great news! Your order has been confirmed, and we're getting everything ready for you. Stay tuned for further updates!`;
        await sendTwilioMessage('+17744868766', twilioMessage);
      }
  
      return updatedOrder;
    } catch (error) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
};
  
module.exports={
updateOrderStatusService
}