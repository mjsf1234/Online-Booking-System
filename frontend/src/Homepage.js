import { useState, useEffect, useContext } from "react";
import User from "./User";
import Table from "./Table";
import axios from "./axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";

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

const Homepage = ({ loginStatusHandler }) => {
  const [bookingData, setBookingData] = useState([]);
  const [currentUserBookingData, setCurrentUserBookingData] = useState({});
  const [currentUser, setCurrentuser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const navigate = useNavigate();

  async function addBookingHandler(order) {
    var date = moment().utcOffset("+05:30").format();
    order["timeStamp"] = date;
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

  useEffect(() => {
    getBookingData();
  }, []);

  async function getBookingData() {
    const req = await axios.get("/getData");
    const data = req.data;
    setBookingData(data);
    console.log("booking detail recieve from the database is ", data);

    var tempdata = data.filter((data) => {
      return data.email === currentUser.email;
    });
    var tempDataBookedSlotList = [];
    tempdata.map((e) => {
      e.bookedSlots.map((_time) => {
        tempDataBookedSlotList.push(_time);
      });
    });
    console.log("list of booked slot iss ", tempDataBookedSlotList.sort());

    setCurrentUserBookingData(tempdata);
  }

  async function deleteBookingHandler(id) {
    const newData = await axios.get("/delete", { params: { id: id } });
    getBookingData();
    console.log("new data receive form database is " + JSON.stringify(newData));
  }

  const logoutHandler = () => {
    localStorage.removeItem("currentUser");
    console.log(
      "login data in local storage is =>",
      localStorage.getItem("currentUser")
    );
    setCurrentuser(null);
    loginStatusHandler(false);
    navigate("/login");
  };

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
      {currentUserBookingData.length > 0 && (
        <Table
          bookingData={currentUserBookingData}
          onDelete={deleteBookingHandler}
        />
      )}

      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Homepage;
