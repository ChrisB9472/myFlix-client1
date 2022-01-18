import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";



export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios
      .post("https://topimdbmovies.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("User does not exist");
      });
  };

  return (
    <>
      <div className="login-view">
        <h1 className="intro">Welcome, to My Flix!</h1>
        <Container>
          <Row>
            <Col>
              <CardGroup>
                <Card>
                  <Card.Body>
                    <Card.Title>Log In</Card.Title>
                    <Form>
                      <Form.Group controlId="formUsername">
                        <span className="subtitle">USERNAME:</span>
                        <br />
                        <input
                          type="text"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="formpassword">
                        <span className="subtitle">PASSWORD</span>
                        <br />
                        <input
                          type="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                        style={{ marginTop: "20px" }}
                      >
                        Login
                      </Button>
                      <p>New to Topimdbmovies? Please sign up!</p>
                      <Link to="/register">
                        <Button
                          style={{ marginTop: "10px" }}
                          variant="primary"
                          type="button"
                        >
                          {" "}
                          Create Account
                        </Button>
                      </Link>
                    </Form>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};