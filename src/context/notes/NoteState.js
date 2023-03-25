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

        const note = await response.json();
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

        // make a deep copy of notes to use in UI
        let newNotes = JSON.parse(JSON.stringify(notes));

        // update note in the UI
        for (let i = 0; i < newNotes.length; i++) {
            const note = newNotes[i];
            if (note._id === _id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        console.log(newNotes);
        setNotes(newNotes);
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
