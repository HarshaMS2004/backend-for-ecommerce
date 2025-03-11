const express = require("express");
const router = express.Router();

// Sample product data (replace with database logic)
let products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 499 }
];

// 🔹 Get all products
router.get("/", (req, res) => {
  res.json(products);
});

// 🔹 Get a single product by ID
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});


// Sample GET route for products
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 499 }
  ]);
});


// 🔹 Update a product by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  
  const product = products.find((p) => p.id == id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = name || product.name;
  product.price = price || product.price;

  res.json({ message: "Product updated successfully", product });
});


module.exports = router;


