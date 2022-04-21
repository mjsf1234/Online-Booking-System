import { setHours, setMinutes, setSeconds } from "date-fns";
import { React, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export const Calender = ({ allFilledSlots, onAddSlot, onHide }) => {
  const [startDate, setStartDate] = useState();
  const [allFilledSlotsArray, setallFilledSlotArray] = useState([]);

  const AllFilledSlotsToSimple = (object) => {
    var result2 = [];
    object.map((e) => {
      e = new Date(Date.parse(e));
      result2.push(
        setHours(setMinutes(setSeconds(new Date(e), 0), 0), e.getHours())
      );
    });
    return result2;
  };

  useEffect(() => {
    setallFilledSlotArray(AllFilledSlotsToSimple(allFilledSlots));
    // console.log("%%%%%%%", allFilledSlotsArray);
  }, [allFilledSlots]);

  const SelectedDateHandler = (date) => {
    // console.log("selected Date is " + new Date(Date.parse(date)));
    setStartDate(date);
  };

  const AddSlotHandler = (event) => {
    event.preventDefault();
    var tempdate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
    onAddSlot(tempdate);
    setStartDate();
  };

  const filterPassedTime = (time) => {
    var tempSelectedtime = setHours(
      setMinutes(setSeconds(new Date(time), 0), 0),
      time.getHours()
    );

    for (var i = 0; i < allFilledSlotsArray.length; i++) {
      if (
        allFilledSlotsArray[i].getHours() === tempSelectedtime.getHours() &&
        allFilledSlotsArray[i].getDate() === tempSelectedtime.getDate()
      ) {
        return false;
      }
    }
    return true;
  };
  const hideCalender = () => {
    onHide();
  };
  let handleColor = (time) => {
    const check = () => {
      var tempSelectedtime = new Date(time);
      for (var i = 0; i < allFilledSlotsArray.length; i++) {
        if (
          allFilledSlotsArray[i].getHours() === tempSelectedtime.getHours() &&
          allFilledSlotsArray[i].getDate() === tempSelectedtime.getDate()
        ) {
          return false;
        }
      }
      return true;
    };
    return check() ? "text-success" : "text-danger";
  };
  return (
    <div style={{ "background-color": "white" }}>
      <div>
        <DatePicker
          placeholderText="Click to Select the Date"
          selected={startDate}
          onChange={SelectedDateHandler}
          showTimeSelect
          timeIntervals={60}
          filterTime={filterPassedTime}
          timeClassName={handleColor}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <button onClick={AddSlotHandler}>Add Slot</button>
      <button onClick={hideCalender}>Close</button>
    </div>
  );
};
