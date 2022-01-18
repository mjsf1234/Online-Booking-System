import express from "express";
import path from "path";
import Razorpay from "razorpay";
import Cors from "cors";

import bodyParser from "body-parser";

const razorpay = new Razorpay({
  key_id: "rzp_test_jzbfCDoTRwWmMu",
  key_secret: "dWLzMFBl1YS4fKRGl5jjxgnL",
});

const app = express();
const port = process.env.PORT || 8001;
app.use(Cors());
app.use(bodyParser.json());
app.use(express.json());

//Handling to any Post request made to this endpoint from axios
app.post("/api/payment", (req, res) => {
  const amount = req.body.enteredAmount;
  res.send(amount);
  getAmount(amount);
});
const getAmount = (amount) => {
  console.log("function call " + amount);
};

app.use(express.json());
const __dirname = path.resolve();

app.get("/logo", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
});

app.post("/razorpay", async (req, res) => {
  console.log("this is reqbody " + req.body.Price);
  const payment_capture = 1;
  const amount = req.body.Price.toString();
  const currency = "INR";
  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: Math.random(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      value: req.body.amountGet,
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, console.log(`listenig to port ${port}`));
