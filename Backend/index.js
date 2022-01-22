import express from "express";
import path from "path";
import Razorpay from "razorpay";
import cors from "cors";
import mongoose from "mongoose";
import Data from "./bookingdb.js";
import bodyParser from "body-parser";

const razorpay = new Razorpay({
  key_id: "rzp_test_jzbfCDoTRwWmMu",
  key_secret: "dWLzMFBl1YS4fKRGl5jjxgnL",
});
//password =VZoyWPFoNWFPaE7t
const app = express();
const port = process.env.PORT || 5000;
const url =
  "mongodb+srv://admin:VZoyWPFoNWFPaE7t@cluster0.6jqxt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json());
const __dirname = path.resolve();
app.use(cors({ credentials: true, origin: true })); // Use this after the variable declaration

//connecting to the database

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log(e);
  });

//Endpoints
app.post("/addData", (req, res) => {
  const dbData = req.body;
  Data.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/addData", (req, res) => {
  Data.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Handling to any Post request made to this endpoint from axios
app.post("/api/payment", (req, res) => {
  const amount = req.body.enteredAmount.toString();
  getAmount(amount);
  res.send(amount);
});
const getAmount = (amount) => {
  console.log("function call " + amount);
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
});

app.post("/razorpay", async (req, res) => {
  console.log("this is reqbody " + req.body.price);
  const payment_capture = 1;
  const amount = req.body.price.toString();
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
