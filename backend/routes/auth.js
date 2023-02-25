const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
// bcryptjs is used to generate hashed passwords
const bcrypt = require("bcryptjs");

const router = express.Router();

// Endpoint - localhost:3000/api/auth/create_user | Create a User using: POST "/api/auth". Doesn't require Authentication
router.post(
    "/create_user",
    [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password length is too short").isLength({ min: 5 }),
    ],
    async (req, res) => {
        // if there are errors in the data entered then return Bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // try-catch block for other errors if there are any
        try {
            // check whether the user with the same email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    error: "Sorry a user with this email already exists",
                });
            }

            // salt is a string which is added at the end of passwords so that it can't be retrieved from rainbow tables
            const salt = await bcrypt.genSalt(10);
            const securedPassword = await bcrypt.hash(req.body.password, salt);

            // create the user in the database if email is unique
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securedPassword,
            });

            // send the details of the user as response for assurance
            res.json(user);
        } catch (error) {
            console.error("Error : " + error.message);
            res.status(500).send("Some error occurred.");
        }
    }
);

module.exports = router;
