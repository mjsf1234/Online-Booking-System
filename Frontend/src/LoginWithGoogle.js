import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "./axios";

const LoginWithGoogle = () => {
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
      localStorage.setItem("currentUser", JSON.stringify(data));
      console.log("navigating to home");
      navigate("/home");
      // <Navigate to="/home" />;
    } else {
      alert("Use IITGN email");
    }
  };
  return (
    <>
      <h1>Google login</h1>
      {currentUser ? (
        <div>
          <h3>your login data is {currentUser.email}</h3>
        </div>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      )}
    </>
  );
};

export default LoginWithGoogle;
