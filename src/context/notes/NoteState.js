import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    // declare a state here for use in other components
    const s1 = {
        name: "Amit",
        class: "7B",
    };

    const [state, setState] = useState(s1);

    // update the values using a function like this
    const update = () => {
        setTimeout(() => {
            setState({
                name: "Amita",
                class: "6B",
            });
        }, 1000);
    };

    // pass the state and update function as one object in value attribute
    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
