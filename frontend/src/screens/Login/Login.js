import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import APIs from "Constants";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [error, setErrormessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleForgotPassword = (event) => {
    navigate("/forgotPassword");
  };

  const handleSubmit = async (event) => {
    console.log("Inside event");
    event.preventDefault();
    if (!email || !password) {
      console.log("Inside condition");
      setErrormessage("Please fill in all required fields");
      return; // Prevent form submission
    }
    try {
      const user = {
        email: email,
        password: password,
      };

      await axios.post(APIs.LOGIN, user).then((response) => {
        console.log(response.data);
        const id = response.data.user.id;
        localStorage.setItem("userId", id);
        localStorage.setItem("email", response.data.user.email);

        window.location.href = "/";
      });
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        setErrormessage(error.response.data.message);
      } else {
        setErrormessage(
          "User does not exist! Please enter correct email or Signup"
        );
      }

      console.log("Error while Login", error);
      console.error(error);
    }
  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="login-container">
          <div className="login-overlay">
            <h1 className="title">Login</h1>
            <p className="subtitle">Ready for your Next Trip? </p>
          </div>
          <Row className="form-container">
            <Col lg={12} md={12}>
              {error && <p className="text-danger text-center">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control ${!isEmailValid ? "is-invalid" : ""
                      }`}
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {!isEmailValid && (
                    <div className="invalid-feedback">Invalid email format</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${!isPasswordValid ? "is-invalid" : ""
                      }`}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {!isPasswordValid && (
                    <div className="invalid-feedback">
                      Enter a valid Password{" "}
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="button button-secondary button-100p"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                {submitted && (
                  <p className="submitted-message">Login Successful</p>
                )}
                <div className="button-container">
                  <button
                    type="button"
                    className="button button-primary button-100p"
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      navigate("/forgotPassword");
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {<p className="submitted-message">Or</p>}

                <div className="button-container">
                  <button
                    type="button"
                    className="button button-primary button-100p"
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                  >
                    Signup
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Login;
