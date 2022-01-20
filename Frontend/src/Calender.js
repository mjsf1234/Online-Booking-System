import React from "react";
import { useEffect, useState } from "react";
import "./Calender.css";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Page, getJson, setOptions } from "@mobiscroll/react";
import BookingList from "./Data/BookingList";
import moment from "moment";

const Calender = (props) => {
  const min = "2022-01-19T00:00";
  const max = "2022-07-19T00:00";

  const [datetimeInvalid, setDatetimeInvalid] = useState([]);
  const [selectedDateTime, setselectedDateTime] = useState();

  const setDateTimeHandler = (event) => {
    var test = new Date(event.value);
    var date = moment(test).format("YYYY-MM-DD");
    console.log("date " + date);
    var datetime = moment(test).format("YYYY-MM-DDTHH:00:00.000") + "Z";

    setselectedDateTime(datetime);
    console.log(selectedDateTime);
  };

  const setInvalidHandler = () => {
    setDatetimeInvalid((prev) => {
      const tempOject = {
        start: selectedDateTime,
        end: selectedDateTime,
      };
      return [...prev, tempOject];
    });
  };

  useEffect(() => {
    console.log("invalid list=> " + datetimeInvalid);
  }, [selectedDateTime]);

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
          invalid={datetimeInvalid}
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
