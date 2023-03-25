const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetch_user = require("../middleware/fetch_user");

// Authentication - bcryptjs is used to generate hashed passwords
const bcrypt = require("bcryptjs");
// Authorization - jsonwebtoken is used to provide sessions ids to the users
const jwt = require("jsonwebtoken");
const jwt_secret = "I want to make strong passwords"; // how is this going to be strong 😅

const router = express.Router();

// Endpoint - Sign Up | localhost:3000/api/auth/create_user | POST "/api/auth" - No login required
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

            // creating payload using user id (unique) stored in database for jwt
            const userData = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(userData, jwt_secret);

            // send the authorization token of the user as response
            res.json({ authToken });
        } catch (error) {
            console.error("Error : " + error.message);
            res.status(500).send("Internal Server Error.");
        }
    }
);

// Endpoint - Login | localhost:3000/api/auth/login | POST "/api/auth" - No login required
router.post(
    "/login",
    // check if the email is valid and password is entered using express-validator
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be empty").exists(),
    ],
    async (req, res) => {
        // success - if user is able to login or not
        let success = false;

        // if there are errors in the data entered then return Bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // try-catch block for other errors if there are any
        try {
            // check whether the user exists in the database
            let user = await User.findOne({ email });

            // show error if user does not exist in database
            if (!user) {
                return res.status(400).json({
                    success,
                    error: "Please login with valid credentials (Invalid Email)",
                });
            }

            // check the entered password with the hashed password in the database
            const comparePassword = await bcrypt.compare(
                password,
                user.password
            );

            // show error if incorrect password is entered
            if (!comparePassword) {
                return res.status(400).json({
                    success,
                    error: "Please login with valid credentials (Invalid Password)",
                });
            }

            // creating payload using user id (unique) stored in database for jwt
            const userPayload = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(userPayload, jwt_secret);
            success = true;

            // send the authorization token of the user as response
            res.json({ success, authToken });
        } catch (error) {
            console.error("Error : " + error.message);
            res.status(500).send("Internal Server Error.");
        }
    }
);

// Endpoint - Get User Data | localhost:3000/api/auth/get_user | POST "/api/auth" - Login required
router.post("/get_user", fetch_user, async (req, res) => {
    // try-catch block for other errors if there are any
    try {
        // get the user ID from the req as it was decoded by the middleware fetch_user
        const userID = req.user.id;

        // get the user details using user ID from the database except the password
        const userDetails = await User.findById(userID).select("-password");

        res.send(userDetails);
    } catch (error) {
        console.error("Error : " + error.message);
        res.status(500).send("Internal Server Error.");
    }
});

module.exports = router;
