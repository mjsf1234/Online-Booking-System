import React from "react";
import { useEffect, useState } from "react";
import "./Calender.css";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Page } from "@mobiscroll/react";
import moment from "moment";

const Calender = ({ onAddSlot, onHide, allFilledSlots }) => {
  const min = "2022-01-19T00:00";
  const max = "2022-07-19T00:00"; //to set the max date to the calender

  const [selectedDateTime, setselectedDateTime] = useState();

  const setDateTimeHandler = (event) => {
    var test = new Date(event.value);
    var date = moment(test).format("YYYY-MM-DD");
    var datetime = moment(test).format("YYYY-MM-DDTHH:00:00.000") + "Z"; // this value of date time has to pass
    setselectedDateTime(datetime);
  };

  const AddSlotHandler = (event) => {
    event.preventDefault();
    const tempOject = {
      start: selectedDateTime,
      end: selectedDateTime,
    };
    onAddSlot(tempOject);
  };

  const hideCalender = () => {
    onHide();
  };

  useEffect(() => {
    console.log("calender page: " + JSON.stringify(allFilledSlots));
  }, [allFilledSlots]);

  return (
    <Page className="md-calendar-booking">
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Please Select Date and Dime</div>
        <Datepicker
          display="inline"
          controls={["calendar", "timegrid"]}
          min={min}
          max={max}
          minTime="08:00"
          maxTime="19:59"
          stepMinute={60}
          width={null}
          // labels={datetimeInvalid}
          invalid={allFilledSlots}
          // onPageLoading={onPageLoadingDatetime}
          cssClass="booking-datetime"
          onChange={setDateTimeHandler}
          on
        />
      </div>
      <button onClick={AddSlotHandler}>Add Slot</button>
      <button onClick={hideCalender}>Close</button>
    </Page>
  );
};

export default Calender;
