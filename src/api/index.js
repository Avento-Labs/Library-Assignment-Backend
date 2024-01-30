const express = require("express");

const books = require("./books");
const user = require("./users");

const router = express.Router();

router.use("/books", books);
router.use('/',user)

module.exports = router;
