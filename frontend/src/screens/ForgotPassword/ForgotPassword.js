import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import axios from "axios";
import APIs from "Constants";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [error, setErrormessage] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleEmailChange = async (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    if (email) {
      try {
        // Check if the email exists in the backend
        const response = await axios.post(
          APIs.FORGOT_PASSWORD,
          {
            email,
          }
        );
        const { exists } = response.data;
        if (exists) {
          setShowOtpField(true);
          setOtp("348652");
        } else {
          setErrormessage(
            "User does not exist. Please enter a valid email address."
          );
        }
      } catch (error) {
        console.error("Error checking email:", error);
        setErrormessage("Error checking email. Please try again later.");
      }
    } else {
      setErrormessage("Please enter a valid email address.");
    }
  };

  const handleOtpChange = (event) => {
    const value = event.target.value;
    setOtp(value);
    // Assuming here that the OTP should be exactly 6 digits
    if (otp) {
      setIsOtpValid(value === "348652");
      setOtp(value);
      console.log(error);
    } else {
      setIsOtpValid(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!otp) {
      setErrormessage("Please enter valid OTP");
      return;
    }
    if (otp === '348652') {
      // If the OTP is valid, you can proceed with the password reset logic here
      console.log("OTP verified. Proceed with password reset.");
      navigate("/resetpassword"); // Replace this with your actual password reset logic
    } else {
      // If the entered OTP is incorrect, show an error message or take appropriate action
      setErrormessage("Incorrect OTP. Please try again.");
    }


  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="forgotpassword-container">
          <div className="forgotpassword-overlay">
            <h1 className="title">Forgot Password?</h1>
          </div>
          <Row className="form-container">
            <Col lg={12} md={12}>
              {error && <p className="text-danger text-center">{error}</p>}
              <form>
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

                {!showOtpField ? (
                  <button
                    type="button"
                    className="button button-primary button-100p"
                    style={{ marginTop: "10px" }}
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                ) : (
                  <div className="form-group">
                    <input
                      type="number"
                      className={`form-control ${!isOtpValid ? "is-invalid" : ""
                        }`}
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      required
                    />
                    {!isOtpValid && (
                      <div className="invalid-feedback">
                        OTP must be 6 digits
                      </div>
                    )}
                    <button
                      type="submit"
                      className="button button-primary button-100p"
                      style={{ marginTop: "10px" }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPassword;
