import React from "react";
import { useEffect, useState } from "react";
import "./Calender.css";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Page } from "@mobiscroll/react";
import moment from "moment";

const Calender = (props) => {
  const min = "2022-01-19T00:00";
  const max = "2022-07-19T00:00";

  const [selectedDateTime, setselectedDateTime] = useState();

  const setDateTimeHandler = (event) => {
    var test = new Date(event.value);
    var date = moment(test).format("YYYY-MM-DD");
    var datetime = moment(test).format("YYYY-MM-DDTHH:00:00.000") + "Z"; // this value of date time has to pass
    setselectedDateTime(datetime);
  };

  const setInvalidHandler = () => {
    props.onAddSlot(selectedDateTime);
    const tempOject = {
      start: selectedDateTime,
      end: selectedDateTime,
    };
    props.OnAddInvalid(tempOject);
  };

  const hideCalender = () => {
    props.onHide();
  };

  return (
    <Page className="md-calendar-booking">
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Select date & time</div>
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
          invalid={props.datetimeInvalid}
          // onPageLoading={onPageLoadingDatetime}
          cssClass="booking-datetime"
          onChange={setDateTimeHandler}
          on
        />
      </div>
      <button onClick={setInvalidHandler}>Book Slot</button>
      <button onClick={hideCalender}>cancel</button>
    </Page>
  );
};

export default Calender;
