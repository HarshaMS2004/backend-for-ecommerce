const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');

dotenv.config();

// User Registration
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.query(sql, [email], async (err, results) => {
            if (err || results.length === 0) {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid Credentials' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
