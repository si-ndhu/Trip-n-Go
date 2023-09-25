import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import APIs from "Constants";

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isUsername, setIsUsername] = useState(true);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [error, setErrormessage] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    setIsUsername(value.match(/^([a-zA-Z]){3,15}$/));
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsConfirmPassword(event.target.value === password);
  };

  const validateEmail = (email) => {
    // Regular expression pattern for email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression pattern for password validation
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,18}$/;
    return pattern.test(password);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setErrormessage("Please fill in all required fields");

      return; // Prevent form submission
    }
    if (password === confirmPassword) {
      // Passwords match, proceed with form submission or other actions
      console.log("Passwords match");
      setPasswordMatch(true);
      const user = {
        username: username,
        email: email,
        password: password,
      };

      await axios
        .post(APIs.SIGNUP, user)
        .then((response) => {
          setMessage("Signup Successful");
          console.log("Inside axios");
          console.log(response.data);
          navigate("/login");
        })
        .catch((error) => {
          if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403)
          ) {
            setMessage(error.response.data.message);
          } else {
            setMessage("Error during signing up", error);
          }

          console.log("Error while signing up", error);
        });
    } else {
      // Passwords do not match, show an error message or take appropriate action
      console.log("Passwords do not match");
      setPasswordMatch(false);
    }
  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="signup-container">
          <div className="signup-overlay">
            <h1 className="title">Sign up</h1>
            <p className="subtitle">Excited about Trip'nGo!! SignUp Here</p>
          </div>
          <Row className="form-container">
            <Col lg={12} md={12}>
              {error && <p className="text-danger text-center">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={`form-control ${
                      !isUsername ? "is-invalid" : ""
                    }`}
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    pattern="([a-zA-Z]){3,15}$"
                    required
                  />
                  {!isUsername && (
                    <div className="invalid-feedback">
                      *Enter a valid Username{" "}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control ${
                      !isEmailValid ? "is-invalid" : ""
                    }`}
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  {!isEmailValid && (
                    <div className="invalid-feedback">
                      *Invalid email format
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${
                      !isPasswordValid ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {!isPasswordValid && (
                    <div className="invalid-feedback">
                      *Password must be at least 8 characters long contain at
                      least one uppercase letter, one lowercase letter, one
                      digit, and one special character.{" "}
                      {isPasswordValid ?? (
                        <small className="form-text text-muted">
                          Password is valid.
                        </small>
                      )}
                    </div>
                  )}
                  <div className="form-group">
                    <input
                      type="password"
                      className={`form-control ${
                        !isConfirmPassword ? "is-invalid" : ""
                      }`}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    {!isConfirmPassword && (
                      <div className="invalid-feedback">
                        *Passwords do not match{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div className="button-container">
                  <button
                    type="submit"
                    className="button button-secondary button-100p"
                  >
                    Sign up
                  </button>
                </div>
                {submitted && (
                  <p className="submitted-message">
                    SignUp Successful. Thank you!
                  </p>
                )}

                <div className="button-container">
                  <button
                    type="submit"
                    className="button button-primary button-100p"
                    style={{ marginTop: "10px" }}
                  >
                    Sign up with Google
                  </button>
                </div>
                {<p className="submitted-message">Or</p>}

                <div className="d-flex flex-column align-items-center">
                  <p className="submitted-message">Already have an account?</p>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="button button-primary button-login"
                  >
                    Login
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

export default SignUp;
