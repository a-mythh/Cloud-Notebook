import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";

    // declare a state here for use in other components
    const n1 = [];
    const [notes, setNotes] = useState(n1);

    // Get all Notes
    const getNotes = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/fetch_all_notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYTc5MTcyZjU3ZDM3M2JiZmYxNzVmIn0sImlhdCI6MTY3NzM1OTM4M30.9EmZjalormEVzwsW1HHRFrV57ifoc5djXqKtmnT_fsM",
            },
        });

        const json = await response.json();
        console.log(json);

        setNotes(json);
    };

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/add_note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYTc5MTcyZjU3ZDM3M2JiZmYxNzVmIn0sImlhdCI6MTY3NzM1OTM4M30.9EmZjalormEVzwsW1HHRFrV57ifoc5djXqKtmnT_fsM",
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const json = await response.json();
        console.log(json);

        const note = {
            _id: "64168e54ccf936125885f1e83b",
            user: "63fa79172f57d373bbff175f",
            title: title,
            description: description,
            tag: tag,
            date: "2023-03-19T04:15:51.200Z",
            __v: 0,
        };
        setNotes(notes.concat(note));
    };

    // Delete a Note
    const deleteNote = async (_id) => {
        // API call
        const response = await fetch(`${host}/api/notes/delete_note/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYTc5MTcyZjU3ZDM3M2JiZmYxNzVmIn0sImlhdCI6MTY3NzM1OTM4M30.9EmZjalormEVzwsW1HHRFrV57ifoc5djXqKtmnT_fsM",
            },
        });

        const json = await response.json();
        console.log(json);

        const newNotes = notes.filter((note) => {
            return note._id !== _id;
        });
        setNotes(newNotes);
    };

    // Edit a Note
    const editNote = async (_id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/update_note/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmYTc5MTcyZjU3ZDM3M2JiZmYxNzVmIn0sImlhdCI6MTY3NzM1OTM4M30.9EmZjalormEVzwsW1HHRFrV57ifoc5djXqKtmnT_fsM",
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const json = await response.json();
        console.log(json);

        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            if (note._id === _id) {
                note.title = title;
                note.description = description;
                note.tag = tag;
            }
        }
    };

    // pass the state and update function as one object in value attribute
    return (
        <NoteContext.Provider
            value={{ notes, addNote, deleteNote, editNote, getNotes }}
        >
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
