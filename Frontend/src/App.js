import "./App.css";
import { useState, useEffect } from "react";
import Amount from "./Amount";
import User from "./User";
import Table from "./Table";

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

const __DEV__ = document.domain === "localhost";

const initialList = [];

function App() {
  //Amount Handler Function
  const [price, setPrice] = useState(10);
  const [amountGet, setAmountGet] = useState(0);
  const [bookingDetails, setBookingDetails] = useState([]); //  [ {name, emails, dates id}  ]
  const [isTrue, setisTrue] = useState(false);

  const amountHandler = (amount) => {
    setAmountGet(amount);
    console.log("this is from amountHandler" + amountGet);
  };
  //adding the new booking
  const addBookingHandler = (order) => {
    console.log("order " + JSON.stringify(order)); // {"name":"anupam","Email":"anupam@gmail.com","id":"0.9742311685374838", bookedSlots:[] }

    setisTrue(true);
    // setPrice("10");

    setBookingDetails((prev) => {
      return [order, ...prev];
    });
  };

  useEffect(() => {
    console.log("All Bookings are: " + JSON.stringify(bookingDetails));
  }, [bookingDetails]);
  //deleting the previous booking
  const deleteBookingHandler = (id) => {
    setBookingDetails(bookingDetails.filter((item) => item.id != id));
  };

  async function displayRazorpay() {
    console.log("clicked");

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("failed to load");
    }
    const bodyData = {
      price,
    };
    const data = await fetch("http://localhost:8001/razorpay", {
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
      amount: amountGet.toString(),
      order_id: data.id,
      name: "test",
      description: "Test Transaction",
      image: "http://localhost:8001/logo",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
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
    <div className="App">
      <User onAddBooking={addBookingHandler} />

      <Amount amount={price} onEnter={amountHandler} />
      <button
        className="App-link"
        onClick={displayRazorpay}
        target="_blank"
        rel="noopener noreferrer"
      >
        Pay {price}$
      </button>

      {/* this is the table section */}
      {isTrue && (
        <Table
          bookingDetails={bookingDetails}
          Ondelete={deleteBookingHandler}
        />
      )}
    </div>
  );
}

export default App;
