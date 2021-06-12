import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import * as apiUtils from "../../apiUtil/apiUtil";
import { Formik, Field, ErrorMessage, Form } from "formik";
import "./Profile.css";
const Profile = () => {
  const history = useHistory();

  const [warning, setWarning] = useState({
    show: false,
    info: "",
  });
  const [profile, setProfile] = useState({
    name: " ",
    phone: " ",
    address: " ",
    email: " ",
  });

  const handleBack = () => {
    history.push("/dashboard");
  };

  const getProfile = async () => {
    const id = localStorage.getItem("userId");
    try {
      const getSprofileResponse = await apiUtils.fetchStaffProfileByEmail({
        id,
      });
      if (getSprofileResponse.status === 200) {
        setProfile({
          name: getSprofileResponse.data.name,
          phone: getSprofileResponse.data.phone,
          email: getSprofileResponse.data.email,
          address: getSprofileResponse.data.address,
        });
      }
    } catch (error) {
      setWarning({
        show: true,
        info: "Get the Init Data Failed!",
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const onSubmit = async ({ name, phone, address }) => {
    const id = localStorage.getItem("userId");
    const updateResponse = await apiUtils.updateProfile({
      id,
      name,
      phone,
      address,
    });
    setWarning({
      show: true,
      info: "Update User Info Successfully",
    });
  };
  return (
    <div>
      <div className="blank"></div>
      <div className="profileBox">
        <h1 style={{ display: "block" }}>Your Profiles</h1>
        {warning.show ? (
          <span style={{ color: "red" }}>{warning.info}</span>
        ) : null}
        <Formik
          enableReinitialize
          initialValues={profile}
          onSubmit={onSubmit}
          // validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <label
                htmlFor="name"
                style={{ display: "block" }}
                className="itemLabel"
              >
                Full Name
              </label>
              <Field
                label="name"
                name="name"
                id="name"
                autoFocus
                autoComplete="name"
              />
              <ErrorMessage name="name">
                {(msg) => <span className="error">{msg}</span>}
              </ErrorMessage>

              <label
                htmlFor="address"
                style={{ display: "block" }}
                className="itemLabel"
              >
                Home Address
              </label>
              <Field
                label="address"
                name="address"
                id="address"
                autoFocus
                autoComplete="address"
              />
              <ErrorMessage name="address">
                {(msg) => <span className="error">{msg}</span>}
              </ErrorMessage>

              <label
                htmlFor="email"
                style={{ display: "block" }}
                className="itemLabel"
              >
                Email
              </label>
              <Field
                label="email"
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                disabled="true"
              />
              <div>
                <ErrorMessage name="email">
                  {(msg) => <span className="error">{msg}</span>}
                </ErrorMessage>
              </div>

              <label
                htmlFor="phone"
                style={{ display: "block" }}
                className="itemLabel"
              >
                Phone Number
              </label>
              <Field
                label="phone"
                id="phone"
                type="phone"
                name="phone"
                autoComplete="phone"
              />
              <div>
                <ErrorMessage name="phone">
                  {(msg) => <span className="error">{msg}</span>}
                </ErrorMessage>
              </div>

              <div className="itemLabel_button">
                <Button className="button" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  className="button"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Comfirm Change
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
