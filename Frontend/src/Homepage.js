import { useState, useEffect, useContext } from "react";
import User from "./User";
import Table from "./Table";
import axios from "./axios";
import { Container } from "react-bootstrap";

const __DEV__ = document.domain === "localhost";
const url = "http://localhost:5000/";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Homepage = () => {
  const [isLogin, setisLogin] = useState(false);
  const [bookingData, setBookingData] = useState([]);

  //adding the new booking to mongodb
  async function addBookingHandler(order) {
    // console.log("order ", tempOrder); // {"name":"mjsf","Email":"mjsf@gmail.com","id":"0.9742311685374838", bookedSlots:[] }
    //sending data to endpoint using axios
    await axios
      .post("/addData", order)
      .then((res) => {
        console.log("data is successfully send to endpoint", res.data);
      })
      .catch((e) => {
        console.log("error in sending the data " + e);
      });
    getBookingData();
  }

  // fetching the data from database on first time page load
  useEffect(() => {
    getBookingData();
  }, []);

  // getting the data from the mongodb

  async function getBookingData() {
    const req = await axios.get("/addData");
    const data = req.data;
    setBookingData(data);
    console.log(
      "booking detail recieve from the database is " + JSON.stringify(req.body)
    );
  }

  //deleting the booking
  async function deleteBookingHandler(id) {
    const newData = await axios.get("/delete", { params: { id: id } });
    getBookingData();
    console.log("new data receive form database is " + JSON.stringify(newData));
  }

  // Razorpay function don't change this

  async function displayRazorpay(amount, tempUserBookings) {
    const basePrice = 100;
    const price = basePrice * amount;
    console.log("clicked " + price);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("failed to load");
    }
    const bodyData = {
      price,
    };
    const data = await fetch(url + "razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }).then((t) => t.json());

    console.log("data from fetch methode");
    console.log(data);
    const options = {
      key: __DEV__ ? "rzp_test_jzbfCDoTRwWmMu" : "Production KEY", // Enter the Key ID generated from the Dashboard
      currency: data.currency,
      amount: price,
      order_id: data.id,
      name: "test",
      description: "Test Transaction",
      image: url,

      handler: function (response) {
        addBookingHandler(tempUserBookings);
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: "Mrityunjay Saraf",
        email: "mrityunjaysaraf5678@gmail.com",
        contact: "9116434230",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div>
      <User
        onAddBooking={addBookingHandler}
        bookingData={bookingData}
        onPay={displayRazorpay}
      />

      {bookingData.length > 0 && (
        <Table bookingData={bookingData} onDelete={deleteBookingHandler} />
      )}
    </div>
  );
};

export default Homepage;
