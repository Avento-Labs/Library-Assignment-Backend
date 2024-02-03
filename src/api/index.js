const express = require("express");

const books = require("./books");
const users = require("./users");
const borrow = require("./borrow");
const auth = require("./auth");
const {authenticateToken }= require('../middlewares');

const router = express.Router();

router.use("/books",authenticateToken, books);
router.use("/users",authenticateToken,users);
router.use("/borrow",borrow);
router.use("/auth",auth);

module.exports = router;
