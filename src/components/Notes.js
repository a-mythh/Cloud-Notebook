import React, { useContext } from "react";

import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
    const { notes, setNotes } = useContext(noteContext);

    return (
        <div className="row my-3">
            <h4 className="text-center">Your Notes</h4>
            {notes.map((note) => {
                return <NoteItem note={note} key={note._id} />;
            })}
        </div>
    );
};

export default Notes;
