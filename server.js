const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // ✅ Correct
const productRoutes = require('./routes/productRoutes')
const userRoutes = require("./routes/users");
const db = require('./config/db');  // Updated path


dotenv.config();
require('dotenv').config();


// Middleware
const app = express();
app.use(express.json());
app.use("/products", productRoutes); 
app.use("/api/auth", authRoutes);
app.use('/payment', paymentRoutes);
app.use(cors());
app.use("/api/products", productRoutes);  
// Import Authentication Routes  
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("🚀 Welcome to the eCommerce API!");
  });



app.get("/api/products", (req, res) => {
    res.json([
      { id: 1, name: "Laptop", price: 999 },
      { id: 2, name: "Phone", price: 499 },
      { id: 3, name: "Smart Watch",price: 150,description: "A modern smartwatch"}
      
    ]);
  });
  
  app.get("/api/users", (req, res) => {
    res.json([
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Doe", email: "jane@example.com" }
    ]);
  });
  
  const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`✅ Server running on port http://localhost:${5000}`));




