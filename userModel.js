const { Sequelize, DataTypes } = require('sequelize');

// Create a connection to MySQL
const sequelize = new Sequelize('ecommerce_db', 'root', 'WJ28@krhps', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define the User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users', // Your MySQL table name
    timestamps: false   // Set to true if using createdAt and updatedAt fields
});

// Sync the model with the database
sequelize.sync()
    .then(() => console.log('User table created (if it does not exist)'))
    .catch(err => console.error('Error creating table:', err));

module.exports = { User, sequelize };
