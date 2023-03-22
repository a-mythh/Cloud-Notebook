import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    // declare a state here for use in other components
    const n1 = [
        {
            _id: "63fb6968fd62e3aee2196be3d",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-02-26T14:09:50.393Z",
            __v: 0,
        },
        {
            _id: "64168e514ccf9365885f1e83b",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-03-19T04:15:51.200Z",
            __v: 0,
        },
        {
            _id: "63fb6968f2d62e3aee296be3d",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-02-26T14:09:50.393Z",
            __v: 0,
        },
        {
            _id: "64168e54cc3f9365885f1e83b",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-03-19T04:15:51.200Z",
            __v: 0,
        },
        {
            _id: "63fb6968fd562e3aee296be3d",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-02-26T14:09:50.393Z",
            __v: 0,
        },
        {
            _id: "64168e54cc2f9365885f1e83b",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-03-19T04:15:51.200Z",
            __v: 0,
        },
        {
            _id: "63fb6968f3d62e3aee296be3d",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-02-26T14:09:50.393Z",
            __v: 0,
        },
        {
            _id: "64168e54ccf93645885f1e83b",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-03-19T04:15:51.200Z",
            __v: 0,
        },
        {
            _id: "63fb6968fd62e312aee296be3d",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-02-26T14:09:50.393Z",
            __v: 0,
        },
        {
            _id: "64168e54ccf93654885f1e83b",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-03-19T04:15:51.200Z",
            __v: 0,
        },
        {
            _id: "63fb6968fd62e3a1ee296be3d",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-02-26T14:09:50.393Z",
            __v: 0,
        },
        {
            _id: "64168e54ccf93625885f1e83b",
            user: "63fa79172f57d373bbff175f",
            title: "What is happening?",
            description: "We will find out soon what is up with you.",
            tag: "Suspicision",
            date: "2023-03-19T04:15:51.200Z",
            __v: 0,
        },
    ];

    const [notes, setNotes] = useState(n1);

    // Add a Note
    const addNote = (title, description, tag) => {
        // TODO - api call
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
    const deleteNote = () => {};

    // Edit a Note
    const editNote = () => {};

    // pass the state and update function as one object in value attribute
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
