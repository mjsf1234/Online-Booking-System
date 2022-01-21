import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    {/* <Navbar /> */}
    <div className="container mt-2" style={{ marginTop: 40 }}>
      <Routes>
        <Route exact path="/">
          {/* <App /> */}
          <div>Hello guys</div>
        </Route>
        <Route path="/receipt">{/* <Receipt /> */}</Route>
      </Routes>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
