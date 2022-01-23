import "./User.css";
import "react-dropdown/style.css";
import React, { useState, useEffect } from "react";
import Calender from "./Calender";
import axios from "axios";

const INIT_SESSION_DETAILS = {
  name: "anupam",
  email: "anupam@gmail.com",
  bookedSlots: [],
  id: "",
};

const User = ({ onAddBooking, bookingData }) => {
  const [sessionDetails, setSessionDetails] = useState(INIT_SESSION_DETAILS);
  const [isValidName, setisValidName] = useState(true);
  const [isValidemail, setIsValidEmail] = useState(true);
  const [userBookedSlot, setUserBookedSlot] = useState([]);
  const [isCalenderVisible, setisCalenderVisible] = useState(false);
  const [allFilledSlots, setAllFilledSlots] = useState([]); // [ {start: " " , end: " "}, {start: " " , end: " "}  ]

  //calender functions
  const onAddSlot = (sessionObject) => {
    // object=> {"start":"2022-01-20T08:00:00.000Z","end":"2022-01-20T08:00:00.000Z"}

    //session state
    setUserBookedSlot((prev) => {
      return [...prev, sessionObject.start];
    });
    //
    setAllFilledSlots((prev) => {
      return [...prev, sessionObject];
    });
  };

  const showCalender = () => setisCalenderVisible(true);
  const hideCalender = () => setisCalenderVisible(false);

  //FirstName verifying and Handling
  const nameChangeHandler = (e) => {
    if (sessionDetails.name.length > 0) {
      setisValidName(true);
    }
    setSessionDetails((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };

  //email verifying and Handling
  const emailChangeHandler = (e) => {
    if (sessionDetails.email.length > 0) {
      setIsValidEmail(true);
    }

    setSessionDetails((prevState) => {
      return { ...prevState, email: e.target.value };
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    setisCalenderVisible(false);

    // Validating inputs
    if (sessionDetails.name.length === 0) {
      setisValidName(false);
      return;
    }
    if (sessionDetails.email.length === 0) {
      setIsValidEmail(false);
      return;
    }
    if (userBookedSlot.length === 0) {
      alert("please choose the slot");
      return;
    }
    const tempUserBookings = {
      ...sessionDetails,
      bookedSlots: userBookedSlot,
      id: Math.random().toString(),
    };

    onAddBooking(tempUserBookings);

    setSessionDetails(INIT_SESSION_DETAILS);
    setUserBookedSlot([]);
  };

  useEffect(() => {
    // taking data from the bookingdata(App.js) initially
    let tempAllBookedSlots = [];
    for (let i = 0; i < bookingData.length; i++) {
      for (let j = 0; j < bookingData[i].bookedSlots.length; j++) {
        tempAllBookedSlots.push({
          start: new Date(bookingData[i].bookedSlots[j]).toISOString(),
          end: new Date(bookingData[i].bookedSlots[j]).toISOString(),
        });
      }
    }
    setAllFilledSlots(tempAllBookedSlots);
    console.log("intially data loaded as =>", tempAllBookedSlots);
  }, [bookingData]);

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
          value={sessionDetails.name}
        ></input>
        <input
          type="email"
          className={`form-field ${!isValidemail ? "invalid" : ""}`}
          placeholder="Enter Your email"
          value={sessionDetails.email}
          onChange={emailChangeHandler}
        ></input>
        {isCalenderVisible ? (
          <Calender
            onHide={hideCalender}
            allFilledSlots={allFilledSlots}
            onAddSlot={onAddSlot}
          />
        ) : (
          <div>
            <button onClick={showCalender}>Book a Slot</button>
          </div>
        )}

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default User;
