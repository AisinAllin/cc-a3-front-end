import React from "react";
import {useHistory} from "react-router-dom";

const SignedInLink = () => {
    const history = useHistory();

    const logout = () => {
        history.push("/login");
        localStorage.clear();
        localStorage.setItem("login", false);
    };
    return (
        <ul className="signIn">
            <li>
                <button onClick={logout}>Log Out</button>
            </li>
        </ul>
    );
};

export default SignedInLink;
