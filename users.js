const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController'); // Ensure this is correctly imported

console.log(createUser); // Add this line to debug

router.post('/register', createUser); // Ensure this function exists

module.exports = router;
