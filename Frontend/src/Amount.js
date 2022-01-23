import "./Amount.css";

import axios from "./axios";

// const url = "http://localhost:5000/";

const Amount = (props) => {
  const getData = (data) => {
    axios
      .post("/api/payment", data)
      .then((res) => console.log("axios amountEntered " + res.data))
      .catch((e) => console.log("axios error " + e));
  };
  // const [amount, setamount] = useState(0);

  // const amountChangeHandler = (event) => {
  //   setamount(event.target.value);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onEnter(props.amount);
    getData({ enteredAmount: props.amount });
  };

  return (
    <div>
      <button onClick={submitHandler}>{props.amount}</button>
    </div>
  );
};

export default Amount;
