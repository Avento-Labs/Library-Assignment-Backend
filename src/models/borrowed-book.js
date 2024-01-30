
const DataTypes = require('sequelize');
const sequelize = require('../dbConnection/dbconnection')
const BorrowedBook = sequelize.define("BorrowedBook", {
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

module.exports = BorrowedBook
