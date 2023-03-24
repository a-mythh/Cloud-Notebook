import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const { note, updateNote } = props;

    const { deleteNote } = useContext(noteContext);

    return (
        <div className="col-md-4">
            <div className="card my-3 text-center">
                <div className="card-header">Note #1</div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <span
                        className="btn btn-outline-warning btn-sm mx-3"
                        style={{ cursor: "default" }}
                    >
                        {note.tag}
                    </span>
                </div>
                <div className="card-footer text-muted">
                    <div className="d-flex justify-content-between">
                        <span>{note.date}</span>
                        <span>
                            <i
                                className="fa-solid fa-pen-to-square mx-2"
                                onClick={() => {
                                    updateNote(note);
                                }}
                            ></i>
                            <i
                                className="fa-solid fa-trash mx-1"
                                onClick={() => {
                                    deleteNote(note._id);
                                }}
                            ></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
