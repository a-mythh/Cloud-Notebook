import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const host = "http://localhost:5000";

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // check if both passwords match
        if (credentials.password !== credentials.confirmPassword) {
            alert("Passwords do not match. Check the password again.");
            return;
        }

        // API call
        const response = await fetch(`${host}/api/auth/create_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
            }),
        });

        const json = await response.json();
        console.log(json);

        if (json.success === true) {
            // save the authentication token and redirect
            localStorage.setItem("token", json.authToken);
            navigate("/");
        } else {
            alert(json.error);
        }
    };

    const onChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className="container my-5" style={{ maxWidth: "540px" }}>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Name"
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        minLength={2}
                        required
                    />
                </div>
                <div className="mb-3">
                    <div className="input-group">
                        <div className="input-group-text">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Email"
                            aria-describedby="emailHelp"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div id="emailHelp" className="form-text mx-5">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-text">
                        <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ display: "block", margin: "auto" }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
