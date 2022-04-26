import "./App.css";
import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import LoginWithGoogle from "./LoginWithGoogle";

function App() {
  const [currentUser, setcurrentUser] = useState(
    localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null
  );
  const navigate = useNavigate();
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={currentUser && <Homepage />} />
        <Route path="/login" element={<LoginWithGoogle />} />
      </Routes>
    </div>
  );
}
export default App;
