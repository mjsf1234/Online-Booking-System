import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import axios from "./axios";

const LoginWithGoogle = ({ loginStatusHandler }) => {
  console.log("Client id is ", process.env.REACT_APP_GOOGLE_CLIENT_ID);
  const navigate = useNavigate();
  const [currentUser, setcurrentUser] = useState(
    localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );

  const handleFailure = (res) => {
    alert(JSON.stringify(res.error));
    console.log("error from the handle failaure ", JSON.stringify(res));
  };

  const handleLogin = async (googleData) => {
    console.log("googleData is ", googleData);
    const res = await axios.post("api/google-login", {
      token: googleData.tokenId,
    });
    const data = res.data;
    const list = res.data.email.split("@");
    console.log("data from the goole-login endpoint is ", data);
    if (list[1] === "gmail.com") {
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

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
  //       scope: "email",
  //     });
  //   }

  //   gapi.load("client:auth2", start);
  // }, []);

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
