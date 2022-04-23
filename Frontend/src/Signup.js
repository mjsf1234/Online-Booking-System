import { useEffect, useState, useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./contexts/AuthContext";
import { async, jsonEval } from "@firebase/util";

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const { currentUser, signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("return value of", currentUser, signup);

    if (passwordRef.current.value !== confirmPassRef.current.value) {
      setError("password do not match");
      return;
    }
    try {
      setError("");
      setloading(true);
      const userDetails = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(userDetails.user);
    } catch {
      setError("failed to create the account");
      setloading(false);
    }
    setloading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Signup</h2>
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

            <Form.Group id="password-confirm">
              <Form.Label>confirm Password</Form.Label>
              <Form.Control ref={confirmPassRef} type="password" required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 ">
        Already have an account? Login
      </div>
    </>
  );
};
