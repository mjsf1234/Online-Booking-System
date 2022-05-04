import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import axios from "./axios";

const LoginWithGoogle = ({ loginStatusHandler }) => {
  const navigate = useNavigate();
  const [currentUser, setcurrentUser] = useState(
    localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );

  const handleFailure = (res) => {
    alert(JSON.stringify(res.error));
  };
  const handleLogin = async (googleData) => {
    console.log("googleData is ", googleData);
    const res = await axios.post("api/google-login", {
      token: googleData.tokenId,
    });
    const data = res.data;
    const list = res.data.email.split("@");
    if (list[1] === "iitgn.ac.in") {
      setcurrentUser(data);
      if (localStorage.getItem("currentUser")) {
        localStorage.removeItem("currentUser");
      }
      localStorage.setItem("currentUser", JSON.stringify(data));
      console.log("navigating to home");
      loginStatusHandler(true);
      navigate("/");
      // <Navigate replace to="/login" />;
    } else {
      alert("Use IITGN email");
    }
  };

  return (
    <>
      <h1>Google login</h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    </>
  );
};

export default LoginWithGoogle;
