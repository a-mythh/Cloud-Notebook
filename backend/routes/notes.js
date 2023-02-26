const express = require("express");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const fetch_user = require("../middleware/fetch_user");

const router = express.Router();

// Endpoint - Fetch all notes | localhost:5000/api/notes/fetch_all_notes | GET "/api/notes" - Login required
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

// Endpoint - Add a new notes | localhost:5000/api/notes/add_note | POST "/api/notes" - Login required
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

// Endpoint - Update a note | localhost:5000/api/notes/update_note/userID | PUT "/api/notes" - Login required
router.put(
    "/update_note/:id",
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

            // update the existing note with whatever has been changed
            const newNote = {};
            if (title) {
                newNote.title = title;
            }
            if (description) {
                newNote.description = description;
            }
            if (tag) {
                newNote.tag = tag;
            }

            // find the note to be updated
            let note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Not Found");
            }

            // check if the user updating the note is the actual author of that note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }

            // find the note in the database and update it
            note = await Notes.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );

            // send the updated note as response for assurance
            res.json(note);
        } catch (error) {
            console.error("Error : " + error.message);
            res.status(500).send("Internal Server Error.");
        }
    }
);

// Endpoint - Delete a note | localhost:5000/api/notes/delete_note/userID | DELETE "/api/notes" - Login required
router.delete("/delete_note/:id", fetch_user, async (req, res) => {
    // try-catch block for other errors if there are any
    try {
        // find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // check if the user deleting the note is the actual author of that note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // find the note in the database and update it
        note = await Notes.findByIdAndDelete(req.params.id);

        // send a success message and the deleted note as response for assurance
        res.json({ Success: "Note deleted", note });
    } catch (error) {
        console.error("Error : " + error.message);
        res.status(500).send("Internal Server Error.");
    }
});

module.exports = router;
