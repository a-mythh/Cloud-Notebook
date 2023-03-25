import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
    return (
        <div class="container1">
            <h1 className="h1-not-found">404</h1>
            <h2 className="h2-not-found">Page not found</h2>
            <p className="p-not-found">
                The page you are looking for does not exist.
            </p>
            <p>
                <Link className="a" to="/login">
                    Visit Login
                </Link>
            </p>
        </div>
    );
};

export default NotFound;
