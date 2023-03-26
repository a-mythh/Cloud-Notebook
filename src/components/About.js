import React from "react";
import { Link } from "react-router-dom";

import "./About.css";

const About = () => {
    return (
        <div className="body-about">
            <section className="section-about">
                <div className="image-about">
                    <img
                        src="https://cdn.pixabay.com/photo/2017/08/26/23/37/business-2684758__340.png"
                        alt="show something"
                    />
                </div>

                <div className="content-about">
                    <h2>About</h2>
                    <span className="line-here"></span>
                    <p>
                        Cloud Notebook is a basic React Application through
                        which you can save your important notes online and
                        access them from anywhere in the world. It is very
                        secure and ensures that your notes belong to you and
                        only you.
                    </p>
                    <ul className="links-about">
                        <li>
                            <Link className="a-about" to="/login">
                                Login
                            </Link>
                        </li>
                        <div className="vertical-line-about"></div>
                        <li>
                            <Link className="a-about" to="/">
                                Make Notes
                            </Link>
                        </li>
                        <div className="vertical-line-about"></div>
                        <li>
                            <Link className="a-about" to="/about">
                                Remember
                            </Link>
                        </li>
                    </ul>
                    <ul className="icons-about">
                        <li>
                            <i className="fa fa-twitter"></i>
                        </li>
                        <li>
                            <i className="fa fa-facebook"></i>
                        </li>
                        <li>
                            <i className="fa fa-github"></i>
                        </li>
                        <li>
                            <i className="fa fa-pinterest"></i>
                        </li>
                    </ul>
                </div>
            </section>
            <br />
            <br />
            <div className="credit-about">
                Made with <span style={{ color: "tomato" }}>❤</span> by{" "}
                <a href="https://www.learningrobo.com/">terminalchillness</a>
            </div>
        </div>
    );
};

export default About;
