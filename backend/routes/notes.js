const express = require("express");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const fetch_user = require("../middleware/fetch_user");

const router = express.Router();

// Endpoint - Fetch all notes | localhost:3000/api/notes/fetch_all_notes | GET "/api/notes" - Login required
router.get("/fetch_all_notes", fetch_user, async (req, res) => {
    try {
        // get all the notes of the user with that ID
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error("Error : " + error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// Endpoint - Add a new notes | localhost:3000/api/notes/add_note | POST "/api/notes" - Login required
router.post(
    "/add_note",
    fetch_user,
    [
        body("title", "Title should be atleast one character.").isLength({
            min: 1,
        }),
        body(
            "description",
            "Description should be atleast two characters."
        ).isLength({ min: 2 }),
    ],
    async (req, res) => {
        // if there are errors in the data entered then return Bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // try-catch block for other errors if there are any
        try {
            // get title, description and tag from the request body
            const { title, description, tag } = req.body;

            // create a note with the required specifications
            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id,
            });

            // save the note in the database
            const savedNote = await note.save();

            // send the saved note as a response for assurance
            res.json(savedNote);
        } catch (error) {
            console.error("Error : " + error.message);
            res.status(500).send("Internal Server Error.");
        }
    }
);

module.exports = router;
