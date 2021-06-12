import React, { useState } from "react";
import * as apiUtils from "../apiUtil/apiUtil";
import { useHistory } from "react-router-dom";
import SignOutNavbar from "../navbar/SignedOutNavbar";
import "./login.css";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState();
  const [error, setError] = useState({
    show: false,
    error: "",
  });

  const getLoginReturnedInfo = async (uuid) => {
    try {
      const loginRes = await apiUtils.login({ uuid });
      if (loginRes.status === 200) {
        localStorage.setItem("userId", loginRes.data);
      }
    } catch (error) {}
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        setUserId(data.accessToken.payload.sub);
        getLoginReturnedInfo(data.accessToken.payload.sub);
        localStorage.setItem("login", "true");
        history.push("/");
      },
      onFailure: (err) => {
        setError({
          show: true,
          error: err.message,
        });
      },
      newPasswordRequired: (data) => {},
    });
  };

  if (localStorage.getItem("login") === "true") {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <SignOutNavbar />
        <h2>Log In</h2>
        <div className="login_box">
          <form onSubmit={onSubmit}>
            <div className="login_item">
              Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError({ show: false });
                }}
              />
            </div>

            <div className="login_item">
              Password:&nbsp;
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError({ show: false });
                }}
              />
            </div>
            {error.show ? <p className="errorMessage">{error.error}</p> : null}

            <div className="login_item">
              <Button variant="contained" type="submit">
                Log In
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
