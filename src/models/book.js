
const DataTypes = require('sequelize');
const sequelize = require('../dbConnection/dbconnection')
  const Book = sequelize.define("Book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  // Book.associate = function (models) {
  //   Book.hasMany(models.BorrowedBook, {
  //     foreignKey: "bookId",
  //   });
  // };
module.exports = Book