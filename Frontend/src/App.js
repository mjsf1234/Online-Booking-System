import logo from "./logo.svg";
import "./App.css";
import Form from "./Form";
import { useState } from "react";
import Amount from "./Amount";

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

function App() {
  //Amount Handler Function

  const [amountGet, setamountGet] = useState(0);
  const amountHandler = (amount) => {
    setamountGet(amount);
    console.log("this is from amountHandler" + amountGet);
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
      amountGet,
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
        name: "Yash Mesharam",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <Form />
      <Amount OnEnter={amountHandler} />
      <button
        className="App-link"
        onClick={displayRazorpay}
        target="_blank"
        rel="noopener noreferrer"
      >
        Donate {amountGet}$
      </button>
    </div>
  );
}

export default App;
