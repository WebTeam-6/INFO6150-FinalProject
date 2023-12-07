
const Product = require("../models/product");
const Order = require("../models/ordersModel");
const User = require("../models/user");

const DashboardController = {

    async getProductsByCategory(req, res){
        try {
            const products = await Product.find({});
        
            const result = products.reduce((acc, product) => {
                const category = product.category;
                acc[category] = (acc[category] || 0) + 1;
                return acc;
              }, {});
        
              console.log("groupedProducts ", result);
        
            return res.json({result});
          } catch (error) {
            console.error(error);
            throw new Error('Error fetching product count by category');
          }
        
    },


// weekly stat i want response like that [{'sunday': 13,'monday': 10}]
async getOrdersByDay(req, res){
    try {
        const orders = await Order.find({});
    
        const weeklyOrders = orders.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          const dayOfWeek = orderDate.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    
          acc[dayOfWeek] = (acc[dayOfWeek] || 0) + 1;
    
          return acc;
        }, {});
    
        return res.json({weeklyOrders : [weeklyOrders]});;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching weekly orders');
      }
},



//total no of orders
async getTotalNoOfOrders(req, res){
    try {
        const orders = await Order.find({});
        const totalOrders = orders.length;
        
        return res.json({totalOrders});
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching total no of orders');
      }
    
},

//total no of customers
async getTotalNoOfCustomers(req, res){
    try {
        const users = await User.find({});
        const totalUsers = users.length;
        
        return res.json({totalUsers});
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching total no of users');
      }
},

//average ratings
async getTotalAverageRatings(req, res){
    try {
        const allProducts = await Product.find({});
        // console.log("allProducts ", allProducts);
        const productsWithRatings = allProducts.filter(product => typeof product.averageRating === 'number');
        console.log("productsWithRatings ", productsWithRatings);

        if (productsWithRatings.length === 0) {
          return res.json({averageRating : 0}) ;
        }
    
        const totalRatings = productsWithRatings.reduce((sum, product) => sum + product.averageRating, 0);
        const averageRating = Math.round((totalRatings / productsWithRatings.length)*100)/100;
    
        return res.json({averageRating});
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching average ratings');
      }
},

async getTotalProducts(req, res){
  try {
      const allProducts = await Product.find({});
      console.log("totalProducts ", allProducts);
      const totalProducts = allProducts.length;
      
      return res.json({totalProducts});
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching average ratings');
    }
},


}

module.exports = DashboardController;


