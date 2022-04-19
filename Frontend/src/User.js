import "./User.css";
import "react-dropdown/style.css";
import React, { useState, useEffect } from "react";
import { Calender1 } from "./Calender1";
import { setHours } from "date-fns";
import setMinutes from "date-fns/setMinutes";

const INIT_SESSION_DETAILS = {
  name: "Yash Saraf",
  email: "yashsaraf@gmail.com",
  bookedSlots: [],
  id: "",
};

const User = ({ onAddBooking, bookingData, onPay }) => {
  const [sessionDetails, setSessionDetails] = useState(INIT_SESSION_DETAILS);
  const [isValidName, setisValidName] = useState(true);
  const [isValidemail, setIsValidEmail] = useState(true);
  const [userBookedSlot, setUserBookedSlot] = useState([]);
  const [isCalenderVisible, setisCalenderVisible] = useState(false);
  const [allFilledSlots, setAllFilledSlots] = useState([]); // [ {start: " " , end: " "}, {start: " " , end: " "}  ]

  // calender1 states

  //calender functions
  const onAddSlot = (sessionObject) => {
    console.log("date receive from calender " + sessionObject); // indian timing=> Fri Jan 28 2022 01:00:00 GMT+0530 (India Standard Time)
    setAllFilledSlots((prev) => {
      return [...prev, sessionObject];
    });
    setUserBookedSlot((prev) => {
      return [...prev, sessionObject];
    });
    console.log("user booked slot is  " + userBookedSlot); // IST timing Fri Jan 28 2022 01:00:00 GMT+0530 (India Standard Time)
    console.log("check" + setHours(setMinutes(new Date(), 0), 12));
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
    onPay(userBookedSlot.length);

    onAddBooking(tempUserBookings);

    setSessionDetails(INIT_SESSION_DETAILS);
    setUserBookedSlot([]);
  };

  useEffect(() => {
    //list for calender 1

    let temp = [];
    console.log("booking data inside useeffect", bookingData);
    for (let i = 0; i < bookingData.length; i++) {
      for (let j = 0; j < bookingData[i].bookedSlots.length; j++) {
        const tempDate = new Date(bookingData[i].bookedSlots[j]);

        temp.push(tempDate);
        console.log("cu;lprit is here=>", tempDate);
      }
    }

    setAllFilledSlots(temp);
    console.log("notavailable " + allFilledSlots);
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

        {console.log("all filled slot sending to calender is", allFilledSlots)}
        {isCalenderVisible ? (
          <Calender1
            allFilledSlots={allFilledSlots}
            onAddSlot={onAddSlot}
            onHide={hideCalender}
          />
        ) : (
          <div>
            <button onClick={showCalender}>Book a Slot</button>
          </div>
        )}

        <button type="submit" className="btn-submit">
          Book Appointment
        </button>
      </form>
    </div>
  );
};
export default User;
