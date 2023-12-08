## SHILPKALA: Because They Create It With Love

![home1](./Resources/home1.png?raw=true "home1")
![dashboard](./Resources/dashboard.png?raw=true "dashboard")
![pdp](./Resources/pdp.png?raw=true "pdp")


> Overview 

Shilpkala is an Indian handicraft and DIY small business website. Shilpkala offers a carefully curated collection of handcrafted treasures. The range includes diverse items such as textiles, jewelry, woodwork, and pottery, showcasing the diversity of Indian craftsmanship. Here, you'll embark on a colorful journey through the heart of India's artisanal heritage, where age-old techniques meet contemporary creativity. Our platform showcases a curated collection of handcrafted treasures, ranging from exquisite textiles and intricate jewelry to finely carved woodwork and eye-catching pottery. What sets us apart is our commitment to empowering small businesses and individual artisans, providing them a digital stage to showcase their creations to the world.

> Roles 

- Admin
- Customers


> Pages

    - Customer:

        - Home
        - Login
        - Registration
        - Shop (View All Products)
        - Wishlist
        - Cart
        - Order History
        - Order Tracking
        - Product Listing Page
        - Product Details
        - WishList


    - Admin:

        - Dashboard
        - Add Product
        - Update Order Status


> Technical Stack

    - Mangoose
    - Express
    - React
    - Node


> Libraries:

- axios: for performing rest endpoint calls
- react-bootstrap: frontend UI library for styling
- mongoose: used as a middleware to connect to mongoDB
- bcrypt: used for authentication
- JWT: for safe transfer of JSON data
- @mu

> Key Features

- Admin dashboard
- Node mailer
- Stripe payment gateway
- SMS using Twilio
- Sorting and Filtering
- Tracking Orders

> CRUD

- Customer 

    - Create User, 
    - Add product to cart, 
    - Add product to Wishlist
    - Place order
    - Delete product from wishlist

- Admin

    - Add new Product
    - Update order status


> Other Information about Project

- End to end data consistency was ensured using validation for each field
- Authentication
- Completely responsive
- Session Management
- Password encryption using bcrypt
- A Model-View-Controller architecture is followed throughout the project
- The entire application is deployed at AWS EC2 Instances - http://ec2-52-204-199-112.compute-1.amazonaws.com/


> Responsiveness:
![responsive1](./Resources/responsive%201.png?raw=true "responsive1")
![responsive2](./Resources/responsive%202.png?raw=true "responsive2")




## Env Variables

Create a .env file in then root and add the following

```
DB_USERNAME= your MongoDB Atlas credentials
DB_PASSWORD= your MongoDB Atlas credentials
JWT_SECRET = abcq12344
ACCOUNT_SID = Twilio SID
AUTH_TOKEN = Twilio Token
```

### Install Dependencies (frontend & backend)

```

cd backend
npm i

cd frontend
npm i

```

### Run

```
# Run frontend (:3000) & backend (:8000)
npm start

# Run backend only
npm start
```

> Application is available at - http://ec2-52-204-199-112.compute-1.amazonaws.com/


