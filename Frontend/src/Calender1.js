import { React, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDate, setHours, setMinutes } from "date-fns";

export const Calender1 = ({ notAvailableSlot }) => {
  const [startDate, setStartDate] = useState(new Date());

  const SelectedDateHandler = (date) => {
    console.log("selected Date is " + date);
    setStartDate(date);
  };
  // const AddSlotHandler = (event) => {
  //   event.preventDefault();

  //   onAddSlot(startDate);
  // };
  // const hideCalender = () => {
  //   onHide();
  // };
  //   let handleColor = (time) => {
  //     return time.getHours() > 12 ? "text-success" : "text-danger";
  //   };
  return (
    <div style={{ "background-color": "white" }}>
      <label>Pick Your Slot</label>
      <DatePicker
        selected={startDate}
        onChange={SelectedDateHandler}
        showTimeSelect
        timeIntervals={60}
        excludeTimes={
          notAvailableSlot

          // [
          //   setHours(setMinutes(new Date(), 0), 17),
          //   setHours(setMinutes(new Date(), 30), 18),
          //   setHours(setMinutes(new Date(), 0), 19),
          //   setHours(setMinutes(new Date(), 30), 17),
          // ]
        }
        //   timeClassName={handleColor}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      {/* <button onClick={AddSlotHandler}>Add Slot</button>
      <button onClick={hideCalender}>Close</button> */}
    </div>
  );
};
