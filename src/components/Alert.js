import React from "react";

export default function Alert(props) {
    function capitalize(string) {
        if (string === "danger") return "Error";
        else return "Success";
        // return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="sticky-top" style={{ height: "50px" }}>
            {props.alert && (
                <div
                    className={`alert alert-${props.alert.type} alert-dismissible`}
                    role="alert"
                >
                    <strong>{capitalize(props.alert.type) + "! "}</strong>
                    {props.alert.msg}
                </div>
            )}
        </div>
    );
}
