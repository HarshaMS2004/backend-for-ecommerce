const mysql = require('mysql2');
const dotenv = require('dotenv');
require('dotenv').config();


dotenv.config(); // Load environment variables from .env

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST,      // Database host (e.g., localhost)
    user: process.env.DB_USER,      // MySQL username
    password: process.env.DB_PASSWORD,  // MySQL password
    database: process.env.DB_NAME   // Database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});

module.exports = db;
