import "./App.css";
import { useState, useEffect, useContext } from "react";
import { Signup } from "./Signup";
import { Container } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Homepage from "./Homepage";
import { useAuth } from "./contexts/AuthContext";
import { Login } from "./Login";

function App() {
  const { isLoggedIn, currentUser } = useAuth();
  console.log("is loggedIn ", isLoggedIn);
  // const navigate = useNavigate();
  return (
    <div className="App">
      <Router>
        <Container className="justify-content-center align-item-center d-flex">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Routes>
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Container>
        {currentUser && (
          <Routes>
            <Route path="/home" element={<Homepage />} />
          </Routes>
        )}
        {/* <Routes>
          <Route path="/" element={<Login />} />
        </Routes> */}
      </Router>
    </div>
  );
}
export default App;
