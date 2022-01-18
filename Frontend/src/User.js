import "./User.css";

import "react-dropdown/style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const User = (props) => {
  const [Values, setValues] = useState({
    name: "",
    Email: "",
    date: "",
    id: "",
    startTime: "",
    endTime: "",
  });

  const [isValidName, setisValidName] = useState(true);
  const [isValidEmail, setisValidEmail] = useState(true);

  //FirstName verifying and Handling
  const nameChangeHandler = (event) => {
    if (Values.name.length > 0) {
      setisValidName(true);
    }
    setValues((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };
  //Email verifying and Handling
  const emailChangeHandler = (event) => {
    if (Values.Email.length > 0) {
      setisValidEmail(true);
    }

    setValues((prevState) => {
      return { ...prevState, Email: event.target.value };
    });
  };
  //date changeHandler
  const dateChangeHandller = (event) => {
    setValues((prevState) => {
      return {
        ...prevState,
        date: event.target.value,
      };
    });
  };

  const time = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [EndTimeList, setEndTimeList] = useState([]);

  //Start time handler
  const startTimeHandler = (event) => {
    setValues((prevState) => {
      return { ...prevState, startTime: event.target.value };
    });
  };

  // declaring the Time array for the EndTime dropdown
  useEffect(() => {
    const temp = time.filter((e) => e > Values.startTime);
    setEndTimeList(temp);
  }, [Values.startTime]);

  //EndTime Handler
  const endTimeHandler = (event) => {
    setValues((prevState) => {
      return { ...prevState, endTime: event.target.value };
    });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (Values.name.length === 0) {
      setisValidName(false);
      return;
    }
    if (Values.Email.length === 0) {
      setisValidEmail(false);
      return;
    }
    const tempObject = { ...Values, id: Math.random().toString() };

    // getData(Values);
    alert("request received");
    console.log(tempObject);
    props.onAddBooking(tempObject);

    setValues((prevState) => {
      return {
        ...prevState,
        name: "",
        Email: "",
        date: "",
        id: "",
        startTime: "",
        endTime: "",
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
          value={Values.name}
        ></input>
        <input
          type="email"
          className={`form-field ${!isValidEmail ? "invalid" : ""}`}
          placeholder="Enter Your Email"
          value={Values.Email}
          onChange={emailChangeHandler}
        ></input>
        <div className="user-input">
          <div className="input-label">
            <label>Enter The Date</label>
          </div>
          <input
            type="date"
            className="input-date "
            value={Values.date}
            onChange={dateChangeHandller}
          ></input>
        </div>

        {/* start time dropdown */}
        <div>
          <label style={{ color: "white" }}>Select the Start Time</label>
          <select onChange={startTimeHandler} value={Values.startTime}>
            {time.map((e) => {
              return <option> {e}</option>;
            })}
          </select>
        </div>

        {/* end time dropdown */}
        <div>
          <label style={{ color: "white" }}>Select the Start Time</label>
          <select onChange={endTimeHandler} value={Values.endTime}>
            {EndTimeList.map((e) => {
              return <option>{e}</option>;
            })}
          </select>
        </div>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default User;
