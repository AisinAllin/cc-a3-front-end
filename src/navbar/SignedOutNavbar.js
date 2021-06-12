import React from "react";
import { Link } from "react-router-dom";
import SignOutLink from "./SignedOutLink";
import "./Navbar.css";

const SignedOutNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar--container">
        <div className="assignment_title">
          <div className="assignment_namenum">
            CC Assignment-3{" "}
            <span className="instock_content"> version 1.5 </span>
          </div>
          <div className="assignment_namenum">
            <span className="expl">Student ID & Student Name: </span>
            S3762087 - JiaHao Ai
          </div>
          <div className="assignment_namenum">
            <span className="expl">Student ID & Student Name: </span>
            S3754443 - YUN-TUNG SHIH
          </div>
        </div>
        <div className="navbar--signStagte">
          <SignOutLink />
        </div>
      </div>
    </nav>
  );
};

export default SignedOutNavbar;
