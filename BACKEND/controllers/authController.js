const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Register User
const register = async (req, res) => {
    try {
        const errors = validationResult(req);

            if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            }
        const { name, email, password } = req.body;

        // Check if email exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Login User
const login = async (req, res) => {

    try {
             const errors = validationResult(req);

            if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            }

        const { email, password } = req.body;
        console.log("Email received:", email);

        const user = await User.findOne({ email });
        console.log("User found:", user);

        if (!user) {

            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password matched:", isMatch);

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({

            success: true,
            token,
            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    register,
    login
};