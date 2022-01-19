import React from "react";
import { useEffect, useState } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker, Page, getJson, setOptions } from "@mobiscroll/react";
import "./Calender.css";
import bookingData from "./BookingData";
import moment from "moment";
setOptions({
  theme: "windows",
  themeVariant: "light",
});

function Calender() {
  const min = "2022-01-18T00:00";
  const max = "2022-07-18T00:00";

  const [datetimeLabels, setDatetimeLabels] = useState([]);
  const [datetimeInvalid, setDatetimeInvalid] = useState([]);
  const [selectedDate, setselectedDate] = useState();
  const [selectedTime, setselectedTime] = useState();
  const [SelectedFullTime, setSelectedFullTime] = useState();
  const [availableTimeSLot, setavailableTimeSlot] = useState([bookingData[0]]);

  const myPickerChange = (event) => {
    console.log("changed!!" + event.value); //01/19/2022 10:00 AM
    console.log(" Dateformate1 " + new Date(event.value)); //Wed Jan 19 2022 10:00:00 GMT+0530 (India Standard Time)
    const test = new Date(event.value);
    const temptime = test.getHours() + ": " + test.getMinutes() + "0   ";
    setselectedTime(temptime);

    var tempdate =
      test.getDate() + "-" + test.getMonth() + "-" + test.getFullYear();
    setselectedDate(tempdate);
    var date = moment(test).format("YYYY-MM-DDTHH:00:00.000") + "Z"; //2022-01-22T18:00:00.000Z
    setSelectedFullTime(date);

    // console.log("test Momnmetn: " + date);
    // console.log("Date UTC formate: " + test.toUTCString()); //Sat, 22 Jan 2022 12:30:00 GMT
    // console.log("ISO Date Formate : " + new Date(test).toISOString());   //2022-01-22T12:30:00.000Z
    // console.log("GMT date formate " + new Date(event.value).toGMTString());   //Sat, 22 Jan 2022 12:30:00 GMT
    // setselectedDate(tempDate);
    // setselectedTime(tempTime);
    // setSelectedFullTime(tempFulldatetime);
  };

  const bookingHandler = () => {
    setavailableTimeSlot((prev) => {
      console.log("Prev " + JSON.stringify(prev));
      const tempObject = {
        start: SelectedFullTime,
        end: SelectedFullTime,
      };
      return { ...prev, invalid: [...prev.invalid, tempObject] };
    });
  };

  useEffect(() => {
    console.log("available time slot" + JSON.stringify(availableTimeSLot));
    console.log("available time slot" + JSON.stringify(bookingData));
  }, [availableTimeSLot]);

  const setDateTimeProp = (l) => {
    let invalid = [];
    let labels = [];
    for (let i = 0; i < l.length; ++i) {
      const booking = l[i];
      const bDate = new Date(booking.d);

      if (booking.nr > 0) {
        labels.push({
          start: bDate,
          title: booking.nr + " SPOTS",
          textColor: "#e1528f",
        });
        invalid = [...invalid, ...booking.invalid];
      } else {
        invalid.push(booking.d);
      }
    }
    setDatetimeLabels(labels);
    setDatetimeInvalid(invalid);
  };
  const onPageLoadingDatetime = () => {
    setDateTimeProp(bookingData);
  };

  // const onPageLoadingDatetime = React.useCallback((event, inst) => {
  //   setDateTimeProp(availableTimeSLot);
  // }, []);

  return (
    <Page className="md-calendar-booking">
      <label> {selectedDate}</label>
      <label> {selectedTime}</label>
      <label>{SelectedFullTime}</label>
      <button onClick={bookingHandler}> Click</button>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Select date & time</div>
        <Datepicker
          returnFormat="locale"
          display="inline"
          controls={["calendar", "timegrid"]}
          min={min}
          max={max}
          minTime="08:00"
          maxTime="19:59"
          stepMinute={60}
          width={null}
          labels={datetimeLabels}
          invalid={datetimeInvalid}
          pages={1}
          onPageLoading={onPageLoadingDatetime}
          cssClass="booking-datetime"
          onChange={myPickerChange}
        />
      </div>
    </Page>
  );
}

export default Calender;
