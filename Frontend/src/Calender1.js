import { React, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDate, setHours, setMinutes } from "date-fns";

export const Calender1 = ({ allFilledSlots, onAddSlot, onHide }) => {
  console.log("not avaliable slot receive is " + allFilledSlots); //IST
  const [startDate, setStartDate] = useState();

  const SelectedDateHandler = (date) => {
    // console.log("selected Date is " + date); //IST timing
    setStartDate(date);
  };
  const AddSlotHandler = (event) => {
    event.preventDefault();
    onAddSlot(startDate);
    setStartDate();
  };
  const hideCalender = () => {
    onHide();
  };
  // let handleColor = (time) => {
  //   return time.getHours() > 12 ? "text-success" : "text-danger";
  // };
  return (
    <div style={{ "background-color": "white" }}>
      <div>
        <DatePicker
          placeholderText="Click to Select the Date"
          selected={startDate}
          onChange={SelectedDateHandler}
          showTimeSelect
          timeIntervals={60}
          //[ Fri Jan 28 2022 12:00:49 GMT+0530 (India Standard Time), Fri Jan 28 2022 12:00:49 GMT+0530 (India Standard Time)]
          excludeTimes={
            allFilledSlots

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
      </div>
      <button onClick={AddSlotHandler}>Add Slot</button>
      <button onClick={hideCalender}>Close</button>
    </div>
  );
};
