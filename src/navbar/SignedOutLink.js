import React from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import "./SignOutLink.css";

const SignedOutLink = () => {
  return (
    <ul className="signIn">
      <li>
        <NavLink to="/signup">
          <Button className="navbar_button" variant="contained" color="primary">
            Sign up
          </Button>
        </NavLink>
      </li>
      <li>
        <NavLink to="/login">
          <Button className="navbar_button" variant="contained" color="primary">
            Log in
          </Button>
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLink;
