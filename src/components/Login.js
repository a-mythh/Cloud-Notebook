import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const host = "http://localhost:5000";

const Login = (props) => {
    const refEmail = useRef(null);
    const refPassword = useRef(null);

    // useNavigate is used to change to a different page
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // API call
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: refEmail.current.value,
                password: refPassword.current.value,
            }),
        });

        const json = await response.json();
        console.log(json);

        if (json.success === true) {
            // save the authentication token and redirect
            localStorage.setItem("token", json.authToken);
            navigate("/");
            props.showAlert("You have been logged in.", "success");
        } else {
            props.showAlert(json.error, "danger");
        }
    };

    return (
        <div className="container my-5" style={{ maxWidth: "540px" }}>
            <h4 className="text-center my-3">Login</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        ref={refEmail}
                        aria-describedby="emailHelp"
                        required
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        ref={refPassword}
                        name="password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
