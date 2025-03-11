const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust as per your setup
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token is in headers and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

            req.user = await User.findById(decoded.id).select('-password'); // Fetch user (exclude password)
            
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next(); // Proceed to the next middleware
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

module.exports = { protect };
