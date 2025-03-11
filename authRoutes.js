const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

let users = []; // Temporary array (Use a database in real apps)
const SECRET_KEY = "your_secret_key"; // Replace with a strong secret key

// 🔹 Register a New User
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and store user
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
});

// 🔹 Login a User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token });
});

module.exports = router;
