import "./App.css";
import { useState, useEffect } from "react";
import Amount from "./Amount";
import User from "./User";
import Table from "./Table";
import axios from "./axios";

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
const url = "http://localhost:5000/";

function App() {
  //Amount Handler Function
  const [price, setPrice] = useState(10);
  const [amountGet, setAmountGet] = useState(0);

  const [temp, setTemp] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [bookingData, setBookingData] = useState([]); //  [ {name, emails, bookedSlots:[], id},  ]

  const amountHandler = (amount) => {
    setAmountGet(amount);
    console.log("this is from amountHandler" + amountGet);
  };
  //adding the new booking
  const addBookingHandler = (order) => {
    console.log("order " + JSON.stringify(order)); // {"name":"anupam","Email":"anupam@gmail.com","id":"0.9742311685374838", bookedSlots:[] }

    setShowTable(true);
    // setPrice("10");

    //sending data to endpoint using axios
    axios
      .post("/addData", order)
      .then((res) => {
        console.log(
          "data is successfully send to endpoint" + JSON.stringify(res.data)
        );
      })
      .catch((e) => {
        console.log("error in sending the data " + e);
      });

    setBookingData((prev) => {
      return [order, ...prev];
    });
  };

  useEffect(() => {
    console.log("All Bookings are: " + JSON.stringify(bookingData));
  }, [bookingData]);

  //deleting the previous booking
  const deleteBookingHandler = (id) => {
    setBookingData(bookingData.filter((item) => item.id != id));
    const newData = axios.get("/delete", { params: { id: id } });
    console.log("new data receive form database is " + JSON.stringify(newData));
  };

  // getting the data from the mongodb
  useEffect(() => {
    async function getBookingData() {
      const req = await axios.get("/addData");
      const data = req.data;
      setTemp(data);
      console.log(
        "booking detail recieve from the database is " +
          JSON.stringify(req.body)
      );
    }
    getBookingData();
  }, [bookingData]);

  //sending the data to mongoodb
  useEffect(() => {
    console.log("data to send to database " + JSON.stringify(temp));
  }, [bookingData]);

  // Razorpay function don't change this
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
      amount: amountGet.toString(),
      order_id: data.id,
      name: "test",
      description: "Test Transaction",
      image: url,

      handler: function (response) {
        // Pass these into a receipt page.

        // history.push(<Recitp);
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
      <User onAddBooking={addBookingHandler} bookingData={bookingData} />

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
      {/* {showTable && bookingData.length > 0 && (
        <Table bookingData={temp} onDelete={deleteBookingHandler} />
      )} */}
      <Table bookingData={temp} onDelete={deleteBookingHandler} />
    </div>
  );
}

export default App;
