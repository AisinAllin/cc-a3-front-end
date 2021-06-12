import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import SignInLink from "./SignedInLink";
import "./Navbar.css";
import * as apiUtils from "../apiUtil/apiUtil";

const SignedInNavbar = () => {
    const [loginInfo, setLoginInfo] = useState({
        firstName: "",
        lastName: "",
    });

    const email = localStorage.getItem("email");

    const getUserInfo = async () => {
        const userInfoResponse = await apiUtils.getUserName({email});
        if (userInfoResponse.status === 200) {
            setLoginInfo({
                firstName: userInfoResponse.data.firstName,
                lastName: userInfoResponse.data.lastName,
            });
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const {firstName, lastName} = loginInfo;
    return (
        <nav className="navbar">
            <div className="navbar--container">
                <Link to="/" className="navbar--title">
                    CC assignment————S3762087
                </Link>
                <div>
                    {firstName} {lastName}
                </div>
                <div className="navbar--signStagte">
                    <SignInLink/>
                </div>
            </div>
        </nav>
    );
};

export default SignedInNavbar;
