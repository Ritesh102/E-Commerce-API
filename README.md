 ADAPT NXT ASSIGNMENT – Simple E-commerce API

This is a full-stack e-commerce web application built as part of the Adapt NXT assignment. It features a secure REST API using Node.js, Express, and MongoDB, along with a clean static frontend in HTML + JavaScript. The platform allows user registration, login, role-based access control, product management, cart handling, and order placement.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Tech Stack**

- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT-based login, Role-based authorization (`admin`, `customer`)
- **Frontend:** HTML + Vanilla JavaScript
- **Testing:** Postman collection included
- **Deployment:** Can be hosted on Render, Railway, or locally

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Key Features**

This project supports two user roles — Customers and Admins — each with their own set of permissions:

A)Customers can:

1)Create an account and log in
2)Browse all available products
3)Add products to their cart
4)Place orders based on their cart
5)View their order history

B)Admins can:

1)Create an account and log in
2)Add, edit, or delete products from the catalog
3)View all orders placed by customers

This role-based access ensures that customers focus on shopping, while admins manage the store and its inventory.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

** Project Structure**

ecommerce-api/
├── app.js # Express app config
├── server.js # Server startup and MongoDB connection
├── .env # Environment variables
├── routes/ # API routes (auth, products, cart, orders)
├── controllers/ # Business logic
├── models/ # Mongoose models
├── middlewares/ # JWT + Role middlewares
├── frontend/ # Static frontend
│ ├── index.html # UI with all buttons and forms
│ └── script.js # Frontend logic with API calls
└── README.md # This file

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

 **Getting Started Locally**

 1. Clone the repository
 2. Install dependencies(npm install)
 3. Create a .env file in the root foler having the fields
       PORT=5000
       MONGO_URI=your_mongodb_connection_string
       JWT_SECRET=your_secret_key
In my folder the .env file is like
       PORT=5000
       MONGO_URI=mongodb+srv://riteshramesh007:abcd1234@cluster0.sahvozn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
       JWT_SECRET=abcd123
4. Start the server(npm run dev)
5. Once running use the frontend to,
Open http://localhost:5000/ in your browser
Use the UI to:
a.Register / Login as Customer or Admin
b.View / Add / Manage Products
c.Add to Cart and Place Orders
d.View Order History

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Authentication**

All API endpoints except /api/auth/register and /api/auth/login are protected.
JWT tokens must be sent in the header

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

**License**
This project is for educational and assignment purposes. You are free to reuse, extend, or build upon it with proper credit.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------


