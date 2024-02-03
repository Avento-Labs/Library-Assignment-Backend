const express = require("express");
const { User } = require("../models");
const { loginSchema } = require("../utils/schemas/authSchema");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const router = express.Router();

// login user
router.post("/login", async (req, res) => {
  try {
    const request  = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({
        where:{
            email:request.email
        }
    })
    if(!user){
        res.status(500).json({ error: 'User not found' });
    }


    const login = await bcrypt.compare(
        request.password,
        user.dataValues.password
    );
    
    if(!login){
        res.status(500).json({ error: "Invalid password" });
    }
    const token = jwt.sign(user.dataValues,process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    res.cookie("auth", token);
    res.status(200).json({ response: token });

    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// logout user
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("auth");
    res.status(201).json('logout successfully');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
