import "./Amount.css";
import { useState } from "react";
import axios from "axios";

const Amount = (props) => {
  const testHandler = () => {
    const testData = {
      name: "yash",
      age: "21",
      profession: "developer",
    };
    axios
      .post("http://localhost:8001/api/test", testData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log("error!! " + e);
      });
  };

  const getData = (data) => {
    axios
      .post("http://localhost:8001/api/payment", data)
      .then((res) => console.log("axios amountEntered " + res.data))
      .catch((e) => console.log("axios error " + e));
  };
  const [amount, setamount] = useState(0);

  const amountChangeHandler = (event) => {
    setamount(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.OnEnter(amount);
    getData({ enteredAmount: amount });
  };

  return (
    <div>
      <label>Enter amount</label>
      <input
        className="input"
        type="text"
        onChange={amountChangeHandler}
        value={amount}
      ></input>
      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
      <button onClick={testHandler}> Test</button>
    </div>
  );
};

export default Amount;
