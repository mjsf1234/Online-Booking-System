import "./User.css";
import "react-dropdown/style.css";
import React, { useState, useEffect } from "react";

const User = (props) => {
  const [values, setValues] = useState({
    name: "anupam",
    Email: "anupam@gmail.com",
    date: "2022-01-15",
    id: "1",
    startTime: "2",
    endTime: "4",
  });

  const [EndTimeList, setEndTimeList] = useState([]);
  const [isValidName, setisValidName] = useState(true);
  const [isValidEmail, setisValidEmail] = useState(true);
  const timeSlot = [
    { key: "1", status: 1 },
    { key: "2", status: 1 },
    { key: "3", status: 1 },
    { key: "4", status: 1 },
    { key: "5", status: 1 },
    { key: "6", status: 1 },
    { key: "7", status: 1 },
    { key: "8", status: 1 },
    { key: "9", status: 1 },
    { key: "10", status: 1 },
    { key: "11", status: 1 },
  ];
  const [AvailableTime, setAvailableTime] = useState(timeSlot);

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

  //date changeHandler
  const dateChangeHandller = (event) => {
    console.log(event.target.value);
    setValues((prevState) => {
      return {
        ...prevState,
        date: event.target.value,
      };
    });
  };

  //Available time Handler
  const availableTimeHandler = () => {
    let newAvailableTime = [];

    console.log(values.startTime === "2");
    for (let i = 0; i < timeSlot.length; i++) {
      if (
        timeSlot[i].key !== values.startTime &&
        timeSlot[i].key !== values.endTime
      ) {
        newAvailableTime.push(timeSlot[i]);
      }
    }

    setAvailableTime(newAvailableTime);
  };

  //Start time handler
  const startTimeHandler = (event) => {
    setValues((prevState) => {
      return { ...prevState, startTime: event.target.value };
    });
  };

  // declaring the Time array for the EndTime dropdown
  useEffect(() => {
    const temp = AvailableTime.filter((e) => e.key > values.startTime);
    setEndTimeList(temp);
  }, [values.startTime]);

  //EndTime Handler
  const endTimeHandler = (event) => {
    setValues((prevState) => {
      return { ...prevState, endTime: event.target.value };
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

    // getData(values);
    // alert("request received");
    console.log(tempObject);
    props.onAddBooking(tempObject);

    // Status updating
    availableTimeHandler();

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
          value={values.name}
        ></input>
        <input
          type="email"
          className={`form-field ${!isValidEmail ? "invalid" : ""}`}
          placeholder="Enter Your Email"
          value={values.Email}
          onChange={emailChangeHandler}
        ></input>
        <div className="user-input">
          <div className="input-label">
            <label>Enter The Date</label>
          </div>
          <input
            type="date"
            className="input-date "
            value={values.date}
            onChange={dateChangeHandller}
          ></input>
        </div>

        {/* start time dropdown */}
        <div>
          <label style={{ color: "white" }}>Select the Start Time</label>
          <select onChange={startTimeHandler} value={values.startTime}>
            {AvailableTime.map((e) => {
              return <option key={e.key}> {e.key}</option>;
            })}
          </select>
        </div>

        {/* end time dropdown */}
        <div>
          <label style={{ color: "white" }}>Select the Start Time</label>
          <select onChange={endTimeHandler} value={values.endTime}>
            {EndTimeList.map((e) => {
              return <option key={e.key}>{e.key}</option>;
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
