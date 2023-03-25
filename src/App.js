import React from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
    return (
        <>
            <NoteState>
                <BrowserRouter>
                    <Navbar />
                    <Alert />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="about/*" element={<About />} />
                            <Route path="login/*" element={<Login />} />
                            <Route path="signup/*" element={<SignUp />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </NoteState>
        </>
    );
}

export default App;
