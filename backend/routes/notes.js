const express = require("express");

const router = express.Router();

// Endpoint - localhost:3000/api/notes
router.get("/", (req, res) => {
    res.json({});
});

module.exports = router;
