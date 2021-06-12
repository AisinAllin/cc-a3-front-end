import React, { useState } from "react";
import * as apiUtils from "../apiUtil/apiUtil";
import { useHistory } from "react-router-dom";
import SignOutNavbar from "../navbar/SignedOutNavbar";
import { Redirect } from "react-router-dom";
import UserPool from "../UserPool";
import Button from "@material-ui/core/Button";

const Signup = () => {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userid, setUserid] = useState();
  const [userInfo, setUserInfo] = useState({
    phone: "",
    address: "",
    name: "",
  });

  const [error, setError] = useState({
    show: false,
    error: "",
  });

  const signUpForUser = async (uuid) => {
    try {
      const signupResponse = await apiUtils.signup({
        uuid,
        name,
        email,
        phone,
        address,
      });
      if (signupResponse.status === 200) {
        history.push("/comfirmnote");
      }
    } catch (error) {}
  };

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        setError({
          show: true,
          error: err.message,
        });
      } else {
        signUpForUser(data.userSub);
        setUserid(data.userSub);
      }
    });
  };

  const { phone, address, name } = userInfo;

  if (localStorage.getItem("login") === "true") {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <SignOutNavbar />
        <h2>Sign Up</h2>
        <div className="login_box">
          <form onSubmit={onSubmit}>
            <div className="login_item">
              Email
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError({ show: false });
                }}
              />
            </div>

            <div className="login_item">
              Password
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError({ show: false });
                }}
              />
            </div>

            <div className="login_item">
              Name
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={userInfo.name}
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    name: event.target.value,
                  });
                  setError({ show: false });
                }}
              />
            </div>

            <div className="login_item">
              Phone Number :&nbsp;
              <input
                value={userInfo.phone}
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    phone: event.target.value,
                  });
                  setError({ show: false });
                }}
              />
            </div>

            <div className="login_item">
              Address
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                value={userInfo.address}
                onChange={(event) => {
                  setUserInfo({
                    ...userInfo,
                    address: event.target.value,
                  });
                  setError({ show: false });
                }}
              />
            </div>

            {error.show ? <p className="errorMessage">{error.error}</p> : null}
            <div className="login_item">
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Signup;
