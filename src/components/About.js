import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
    // useContext provides us the props without much hassle
    const a = useContext(noteContext);

    // using the useEffect hook to update the value of the props
    useEffect(() => {
        a.update();
    });

    // the values are stored in an object 'a' having another object 'state' using name and class properties
    return (
        <div>
            This is about {a.state.name}. He is in class {a.state.class}
        </div>
    );
};

export default About;
