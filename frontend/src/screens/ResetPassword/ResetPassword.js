import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import axios from "axios";
import APIs from "Constants";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [error, setErrormessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsConfirmPassword(event.target.value === password);
  };

  const validatePassword = (password) => {
    // Regular expression pattern for password validation
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,18}$/;
    return pattern.test(password);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    if (!email || !confirmPassword || !password) {
      setErrormessage("Please fill in all required fields");

      return; // Prevent form submission
    }
    try {
      const response = await axios.post(
        APIs.FORGOT_PASSWORD,
        { email }
      );
      console.log("valid email");
      const { exists } = response.data;
      if (exists) {
        const user = {
          email: email,
          password: password,
        };

        await axios
          .post(APIs.RESET_PASSWORD, user)
          .then((response) => {
            console.log("Password updated successfully");
            setMessage("Password updated successfully");

            navigate("/login");
          });
      } else {
        // Email does not exist in the database, show an error message
        setErrormessage(
          "User does not exist. Please enter a valid email address."
        );
      }
    } catch (error) {
      console.log("Error updating password:", error);
      setErrormessage("Error updating password. Please try again later.");
    }
  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="resetpass-container">
          <div className="resetpass-overlay">
            <h1 className="title">Reset Password</h1>
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
                    placeholder="New Password"
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
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${!isConfirmPassword ? "is-invalid" : ""
                      }`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  {!isConfirmPassword && (
                    <div className="invalid-feedback">
                      Passwords do not match{" "}
                      <span style={{ color: "red" }}>*</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="button button-secondary button-100p"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                {submitted && (
                  <p className="submitted-message">Password reset Successful</p>
                )}
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ResetPassword;
