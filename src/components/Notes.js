import React, { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";

import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = () => {
    const { notes, getNotes } = useContext(noteContext);

    // fetch all the notes
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // make a reference for the edit button
    const ref = useRef(null);

    // const { addNote } = useContext(noteContext);
    const [note, setNote] = useState({
        editTitle: "",
        editDescription: "",
        editTag: "",
    });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            editTitle: currentNote.title,
            editDescription: currentNote.description,
            editTag: currentNote.tag,
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log(note);
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote />

            <button
                type="button"
                ref={ref}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
            >
                Edit Note
            </button>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Edit Note
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="edit-title"
                                        className="col-form-label"
                                    >
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="editTitle"
                                        name="editTitle"
                                        value={note.editTitle}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="edit-description"
                                        className="col-form-label"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="editDescription"
                                        name="editDescription"
                                        style={{
                                            resize: "none",
                                            height: "20vh",
                                        }}
                                        value={note.editDescription}
                                        onChange={onChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="edit-tag"
                                        className="col-form-label"
                                    >
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="editTag"
                                        name="editTag"
                                        value={note.editTag}
                                        onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleClick}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h4 className="text-center">Your Notes</h4>
                {notes.map((note) => {
                    return (
                        <NoteItem
                            note={note}
                            key={note._id}
                            updateNote={updateNote}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Notes;
