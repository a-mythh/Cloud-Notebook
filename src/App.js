import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import NoteState from "./context/notes/NoteState";
import NotFound from "./components/NotFound";

function App() {
    // show alert for various operations
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type,
        });

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    return (
        <>
            <NoteState>
                <BrowserRouter>
                    <Navbar className="sticky-top" />
                    <Alert alert={alert} />
                    <div className="container">
                        <Routes>
                            <Route
                                path="/"
                                element={<Home showAlert={showAlert} />}
                            />
                            <Route path="about/*" element={<About />} />
                            <Route
                                path="login/*"
                                element={<Login showAlert={showAlert} />}
                            />
                            <Route
                                path="signup/*"
                                element={<SignUp showAlert={showAlert} />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </NoteState>
        </>
    );
}

export default App;
