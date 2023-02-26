const jwt = require("jsonwebtoken");
const jwt_secret = "I want to make strong passwords"; // how is this going to be strong 😅

// Middleware function - Returns the User ID from the jwt authorization token
const fetch_user = (req, res, next) => {
    // Get the user ID from the jwt token and add ID to req object
    const authToken = req.header("auth-token");
    if (!authToken) {
        res.status(401).send({
            error: "Kindly authenticate using a valid token.",
        });
    }

    try {
        // match the authorization token and extract user ID from it
        const userData = jwt.verify(authToken, jwt_secret);
        req.user = userData.user;

        // run the rest of the functions after this
        next();
    } catch (error) {
        res.status(401).send({
            error: "Kindly authenticate using a valid token.",
        });
    }
};

module.exports = fetch_user;
