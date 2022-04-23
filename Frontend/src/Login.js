import { useEffect, useState, useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder="name@example.com"
              />
            </Form.Group>

            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              ref={passwordRef}
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </Form.Text>
            <Button type="submit" className="w-100 ">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
