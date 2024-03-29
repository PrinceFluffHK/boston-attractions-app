import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    username:"",
    firstName:"",
    lastName:"",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const validateInput = (payload) => {
    setErrors({});
    const { username, firstName, lastName, email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};

  if (username.length > 36) {
    newErrors = {
      ...newErrors,
      username: "must be no more than 36 characters"
    };
  }

    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required",
      };
    }

    if (firstName.trim() == "") {
      newErrors = {
        ...newErrors,
        firstName: "is required",
      };
    }

    if (lastName.trim() == "") {
      newErrors = {
        ...newErrors,
        lastName: "is required",
      };
    }

    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0){
      return true
    }
    return false
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    validateInput(userPayload);
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
          }
        const userData = await response.json();
        setShouldRedirect(true);
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  }
  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  if (shouldRedirect) {
    location.href = "/";
  }
  return (
    <div className="grid-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
        <label>
            Username
            <input
              type="text"
              name="username"
              value={userPayload.username}
              onChange={onInputChange}
            />
            <FormError error={errors.username} />
          </label>
          <label>
            First name
            <input
              type="text"
              name="firstName"
              value={userPayload.firstName}
              onChange={onInputChange}
            />
            <FormError error={errors.firstName} />
          </label>
          <label>
            Last name
            <input
              type="text"
              name="lastName"
              value={userPayload.lastName}
              onChange={onInputChange}
            />
            <FormError error={errors.lastName} />
          </label>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};
export default RegistrationForm;
