module.exports = (sequelize, DataTypes) => {
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

  BorrowedBook.associate = function (models) {
    BorrowedBook.belongsTo(models.Book, {
      foreignKey: "bookId",
      onDelete: "CASCADE",
    });
    BorrowedBook.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return BorrowedBook;
};
