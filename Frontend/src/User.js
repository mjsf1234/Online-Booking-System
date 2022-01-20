import "./User.css";
import "react-dropdown/style.css";
import React, { useState, useEffect } from "react";

const User = (props) => {
  const [values, setValues] = useState({
    name: "anupam",
    Email: "anupam@gmail.com",
  });

  const [isValidName, setisValidName] = useState(true);
  const [isValidEmail, setisValidEmail] = useState(true);

  //FirstName verifying and Handling
  const nameChangeHandler = (event) => {
    if (values.name.length > 0) {
      setisValidName(true);
    }
    setValues((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };

  //Email verifying and Handling
  const emailChangeHandler = (event) => {
    if (values.Email.length > 0) {
      setisValidEmail(true);
    }

    setValues((prevState) => {
      return { ...prevState, Email: event.target.value };
    });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (values.name.length === 0) {
      setisValidName(false);
      return;
    }
    if (values.Email.length === 0) {
      setisValidEmail(false);
      return;
    }
    const tempObject = { ...values, id: Math.random().toString() };

    console.log(tempObject);
    props.onAddBooking(tempObject);

    setValues((prevState) => {
      return {
        ...prevState,
        name: "",
        Email: "",
      };
    });
  };

  return (
    <div className="form-main">
      <div className="form-title">
        <label>Online Booking System</label>
      </div>

      <form onSubmit={submitFormHandler}>
        <input
          type="text"
          className={`form-field ${!isValidName ? "invalid" : ""}`}
          onChange={nameChangeHandler}
          placeholder="Enter Your Name"
          value={values.name}
        ></input>
        <input
          type="email"
          className={`form-field ${!isValidEmail ? "invalid" : ""}`}
          placeholder="Enter Your Email"
          value={values.Email}
          onChange={emailChangeHandler}
        ></input>

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default User;
