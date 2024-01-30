const express = require("express");
const { BorrowedBook, Book, User } = require("../models");

const router = express.Router();

// Borrow a book
router.post("/borrow", async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const book = await Book.findByPk(bookId);
    const user = await User.findByPk(userId);

    if (!book || !user) {
      return res.status(404).json({ error: "User or Book not found" });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ error: "Book is not available" });
    }

    const newBorrowedBook = await BorrowedBook.create({ userId, bookId });
    await book.decrement("quantity");
    res.status(201).json(newBorrowedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Return a book
router.post("/return", async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const borrowedBook = await BorrowedBook.findOne({
      where: {
        userId,
        bookId,
        returnDate: null,
      },
    });

    if (!borrowedBook) {
      return res.status(404).json({ error: "Borrowed book record not found" });
    }

    await borrowedBook.update({ returnDate: new Date() });
    await Book.increment("quantity", { where: { id: bookId } });
    res.json(borrowedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all borrowed books
router.get("/", async (req, res) => {
  try {
    const borrowedBooks = await BorrowedBook.findAll({
      include: [User, Book],
    });
    res.json(borrowedBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get borrowing details by ID
router.get("/:id", async (req, res) => {
  try {
    const borrowedBook = await BorrowedBook.findByPk(req.params.id, {
      include: [User, Book],
    });

    if (!borrowedBook) {
      return res.status(404).json({ error: "Borrowed book record not found" });
    }

    res.json(borrowedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
