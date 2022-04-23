import "./App.css";
import { useState, useEffect, useContext } from "react";
// import User from "./User";
// import Table from "./Table";
// import axios from "./axios";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Container } from "react-bootstrap";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Container
            className="justify-content-center align-item-center d-flex"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Routes>
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}
export default App;
