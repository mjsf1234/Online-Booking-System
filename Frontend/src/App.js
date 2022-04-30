import "./App.css";
import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import LoginWithGoogle from "./LoginWithGoogle";
import ErrorPage from "./ErrorPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("currentUser") ? true : false
  );

  const loginStatusHandler = (check) => {
    setIsLoggedIn(check);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <LoginWithGoogle loginStatusHandler={loginStatusHandler} />
            )
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Homepage loginStatusHandler={loginStatusHandler} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
export default App;
