import "./App.css";
import { useState } from "react";
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
  const [Price, setPrice] = useState(0);
  const [amountGet, setamountGet] = useState(0);
  const [BookingList, setBookingList] = useState(initialList);
  const [isTrue, setisTrue] = useState(false);

  const amountHandler = (amount) => {
    setamountGet(amount);
    console.log("this is from amountHandler" + amountGet);
  };
  //adding the new booking
  const addBookingHandler = (order) => {
    setisTrue(true);
    setPrice(order.endTime - order.startTime);

    setBookingList((prev) => {
      return [order, ...prev];
    });
    console.log("boooking receive: " + JSON.stringify(BookingList));
  };
  //deleting the previous booking
  const deleteBookingHandler = (id) => {
    setBookingList(BookingList.filter((item) => item.id != id));
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
      Price,
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

      <Amount amount={Price} onEnter={amountHandler} />
      <button
        className="App-link"
        onClick={displayRazorpay}
        target="_blank"
        rel="noopener noreferrer"
      >
        Pay {Price}$
      </button>

      {/* this is the table section */}
      {isTrue && (
        <Table bookingList={BookingList} Ondelete={deleteBookingHandler} />
      )}
    </div>
  );
}

export default App;
