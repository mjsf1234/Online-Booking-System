import "./User.css";
import "react-dropdown/style.css";
import React, { useState, useEffect } from "react";
import { Calender } from "./Calender";
import { Button, Form } from "react-bootstrap";

const INIT_SESSION_DETAILS = {
  name: "",
  bookedSlots: [],
  id: "",
};

const User = ({ onAddBooking, bookingData, onPay }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [sessionDetails, setSessionDetails] = useState(INIT_SESSION_DETAILS);
  const [userBookedSlot, setUserBookedSlot] = useState([]);
  const [isCalenderVisible, setisCalenderVisible] = useState(false);
  const [allFilledSlots, setAllFilledSlots] = useState([]);
  const showCalender = () => setisCalenderVisible(true);
  const hideCalender = () => setisCalenderVisible(false);

  const onAddSlot = (sessionObject) => {
    setAllFilledSlots((prev) => {
      return [...prev, sessionObject];
    });
    setUserBookedSlot((prev) => {
      return [...prev, sessionObject];
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    setisCalenderVisible(false);
    if (userBookedSlot.length === 0) {
      alert("please choose the slot");
      return;
    }
    const tempUserBookings = {
      ...sessionDetails,
      name: currentUser.name,
      email: currentUser.email,
      bookedSlots: userBookedSlot,
      id: Math.random().toString(),
    };
    onPay(userBookedSlot.length, tempUserBookings);
    setSessionDetails(INIT_SESSION_DETAILS);
    setUserBookedSlot([]);
  };

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < bookingData.length; i++) {
      for (let j = 0; j < bookingData[i].bookedSlots.length; j++) {
        const tempDate = new Date(bookingData[i].bookedSlots[j]);
        temp.push(tempDate);
      }
    }
    setAllFilledSlots(temp);
  }, [bookingData]);

  return (
    <div className="form-main">
      <div className="form-title">
        <label>Online Booking System</label>
      </div>

      <Form onSubmit={submitFormHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={currentUser.name}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            readOnly
            value={currentUser.email}
          />
        </Form.Group>
        {isCalenderVisible ? (
          <Calender
            allFilledSlots={allFilledSlots}
            onAddSlot={onAddSlot}
            onHide={hideCalender}
          />
        ) : (
          <div>
            <Button
              variant="success"
              style={{ margin: "1rem" }}
              onClick={showCalender}
            >
              pick a slot
            </Button>
          </div>
        )}
        <Button variant="primary" type="submit">
          book your Slot
        </Button>
      </Form>
    </div>
  );
};
export default User;
