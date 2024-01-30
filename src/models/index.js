// Import the Sequelize instance from the dbConnection module
let sequelize = require('../dbConnection/dbconnection');

// Import the Book and User models
const Book = require('./book');
const User = require("./user");
const BorrowedBook = require("./borrowed-book")


// Synchronize models with the database
sequelize.sync({ force: false }) // Set force: true to drop existing tables and recreate them
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });
// Define associations between User and BorrowedBook models
User.associate = function (models) {
  User.hasMany(BorrowedBook, {
    foreignKey: "userId",
  });
};

// Define associations between Book and BorrowedBook models
Book.associate = function (models) {
  Book.hasMany(BorrowedBook, {
    foreignKey: "bookId",
  });
};

BorrowedBook.associate = function (models) {
  BorrowedBook.belongsTo(Book, {
    foreignKey: "bookId",
    onDelete: "CASCADE",
  });
  BorrowedBook.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
};

// Get all models defined in the sequelize instance
const models = sequelize.models;

// Log the models to the console (for debugging purposes)
console.log(models);

// Create an object to store the sequelize instance
const db = {};
db.sequelize = sequelize;

// Export the sequelize instance and models for use in other parts of the application
module.exports = { db, models };
