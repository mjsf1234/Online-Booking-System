import "./User.css";
import "react-dropdown/style.css";
import React, { useState, useEffect } from "react";
import Calender from "./Calender";
import moment from "moment";

const User = (props) => {
  const [bookingDetails, setBookingDetails] = useState({
    name: "anupam",
    email: "anupam@gmail.com",
    bookedSlots: [],
    id: "",
  });

  const [isValidName, setisValidName] = useState(true);
  const [isValidemail, setIsValidEmail] = useState(true);
  const [userBookedSlot, setUserBookedSlot] = useState([]);
  const [allBookedSlotList, setAllBookedSlotList] = useState([]); // [ {start: " " , end: " "}, {start: " " , end: " "}  ]
  const [isCalenderVisible, setisCalenderVisible] = useState(false);

  //calender functions
  const BookedSlotHandler = (object) => {
    // object=> {"start":"2022-01-20T08:00:00.000Z","end":"2022-01-20T08:00:00.000Z"}
    const tempUserBookedSlot = object.start;
    setUserBookedSlot((prev) => {
      return [...prev, tempUserBookedSlot];
    });

    setAllBookedSlotList((prev) => {
      return [...prev, object];
    });
  };

  // testing
  useEffect(() => {
    console.log("updated userBookedslot => " + userBookedSlot);
  }, [userBookedSlot]);

  const showCalender = () => {
    setisCalenderVisible(true);
  };

  const hideCalender = () => {
    setisCalenderVisible(false);
  };
  //_____________________________________________________________

  //FirstName verifying and Handling
  const nameChangeHandler = (event) => {
    if (bookingDetails.name.length > 0) {
      setisValidName(true);
    }
    setBookingDetails((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };

  //email verifying and Handling
  const emailChangeHandler = (event) => {
    if (bookingDetails.email.length > 0) {
      setIsValidEmail(true);
    }

    setBookingDetails((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log("component re-render");
    setisCalenderVisible(false);
    if (bookingDetails.name.length === 0) {
      setisValidName(false);
      return;
    }
    if (bookingDetails.email.length === 0) {
      setIsValidEmail(false);
      return;
    }
    const tempObject = {
      ...bookingDetails,
      bookedSlots: userBookedSlot,
      id: Math.random().toString(),
    };

    // const tempObject = {
    //   ...bookingDetails,
    //   id: Math.random().toString(),
    // };

    console.log("Booking Summery: " + JSON.stringify(tempObject));
    props.onAddBooking(tempObject);

    setBookingDetails((prevState) => {
      return {
        ...prevState,
        name: "",
        email: "",
        bookedSlots: [],
        id: "",
      };
    });
    setUserBookedSlot([]);
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
          value={bookingDetails.name}
        ></input>
        <input
          type="email"
          className={`form-field ${!isValidemail ? "invalid" : ""}`}
          placeholder="Enter Your email"
          value={bookingDetails.email}
          onChange={emailChangeHandler}
        ></input>
        {isCalenderVisible ? (
          <Calender
            onHide={hideCalender}
            allBookedSlotList={allBookedSlotList}
            onAddSlot={BookedSlotHandler}
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
