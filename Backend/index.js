import express from "express";
import path from "path";
import Razorpay from "razorpay";
import cors from "cors";
import mongoose from "mongoose";
import dbData from "./bookingdb.js";
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

//connecting to the database and checking the connection

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
  const data = req.body;
  dbData.create(data, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/addData", (req, res) => {
  dbData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/delete", (req, res) => {
  console.log(req.query.id);
  const idQuery = req.query.id;
  dbData.findOneAndDelete({ id: idQuery }, (err, data) => {
    if (err) {
      res.status(600).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Handling to any Post request made to this endpoint from axios

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
});

//handling the invalid api request

app.post("/razorpay", async (req, res) => {
  console.log("this is reqbody ");
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
    console.log("res" + response);
    res.json({
      value: req.body.amountGet,
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log("error" + error);
  }
});

app.listen(port, console.log(`listenig to port ${port}`));
