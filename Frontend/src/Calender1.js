import { setHours, setMinutes, setSeconds } from "date-fns";
import { te } from "date-fns/locale";
import { React, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Calender1 = ({ allFilledSlots, onAddSlot, onHide }) => {
  //
  const AllFilledSlotsToSimple = (object) => {
    var result2 = [];
    object.map((e) => {
      result2.push(
        setHours(setMinutes(setSeconds(new Date(e), 0), 0), e.getHours())
      );
    });
    // console.log("converted array=>", result2);
    return result2;
  };
  //
  // console.log(
  //   "all filed slots ",
  //   allFilledSlots.map((e) => {
  //     console.log(
  //       "converting=",
  //       setHours(setMinutes(setSeconds(new Date(e), 0), 0), e.getHours())
  //     );
  //   })
  // );
  const [startDate, setStartDate] = useState();
  const [allFilledHours, setAllFilledHours] = useState([]);
  const [allFilledDate, setAllFilledDate] = useState([]);
  const [allFilledSlotsArray, setallFilledSlotArray] = useState([]);

  const getHoursFromList = (dateTimeArray) => {
    var result = [];
    dateTimeArray.map((e) => {
      result.push(e.getHours());
    });
    return result;
  };
  const getDateFromList = (dateTimeArray) => {
    var result1 = [];
    dateTimeArray.map((e) => {
      console.log("date that is filled", e.getDate());
      result1.push(e.getDate());
    });
    return result1;
  };
  useEffect(() => {
    setAllFilledHours(getHoursFromList(allFilledSlots));
    setAllFilledDate(getDateFromList(allFilledSlots));
    setallFilledSlotArray(AllFilledSlotsToSimple(allFilledSlots));
    console.log("%%%%%%%", allFilledSlotsArray);
  }, [allFilledSlots]);

  const SelectedDateHandler = (date) => {
    console.log("selected Date is " + new Date(Date.parse(date)));
    setStartDate(date);
  };
  const AddSlotHandler = (event) => {
    event.preventDefault();
    onAddSlot(startDate);
    setStartDate();
  };

  const filterPassedTime = (time) => {
    var tempSelectedtime = setHours(
      setMinutes(setSeconds(new Date(time), 0), 0),
      time.getHours()
    );

    console.log("seletecd time is ", tempSelectedtime);

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
