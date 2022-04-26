import { useEffect, useState, useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login, isLoggedIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("the value of useAuth", isLoggedIn);
    try {
      setError("");
      setloading(true);
      const userDetails = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log("New Login user details=>", userDetails.user);
      navigate("/home");
    } catch (err) {
      setError("failed to sign in" + err);
      console.log("error in login is ", err);
      setloading(false);
    }
    setloading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {currentUser && JSON.stringify(currentUser.email)}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group id="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder="name@example.com"
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passwordRef} type="password" required />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100 mt-2">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 ">
        Need an Account?{" "}
        <Link to="/signup">
          <Button>Signup</Button>
        </Link>
      </div>
    </>
  );
};
