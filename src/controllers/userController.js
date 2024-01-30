const bcrypt = require('bcrypt')
const config = require('../../configure')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
module.exports = {
    signUp:async (req, res) => {
        try {
            // Extract email and password from the request body
            const {email, password } = req.body;

            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new user with the hashed password
            const newUser = await User.create({ email, password: hashedPassword })
    
            // Generate a JWT token
            const token = jwt.sign({ userId: newUser.id }, config.jwt, {
                expiresIn: '1h' // Token expiration time
            });
    
            // Set the JWT token as a cookie in the response
            res.cookie('token', token, {
                httpOnly: true, // Cookie cannot be accessed via client-side scripts
                maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
                secure: process.env.NODE_ENV === 'production' // Cookie will only be sent over HTTPS in production
            });
    
            // Respond with success message and user details (if needed)
            res.status(200).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            // If an error occurs during sign-up, respond with an error message
            res.status(400).json({ error: error.message });
        }
},
login: async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        // If user is not found, respond with an error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords don't match, respond with an error
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, config.jwt, {
            expiresIn: '1h' // Token expiration time
        });

        // Set the JWT token as a cookie in the response
        res.cookie('token', token, {
            httpOnly: true, // Cookie cannot be accessed via client-side scripts
            maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
            secure: process.env.NODE_ENV === 'production' // Cookie will only be sent over HTTPS in production
        });

        // Respond with success message and user details (if needed)
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        // If an error occurs during login, respond with an error message
        res.status(400).json({ error: error.message });
    }
}
}