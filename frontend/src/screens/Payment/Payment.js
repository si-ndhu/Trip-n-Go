// Author: Abhishek Bhatt

import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import APIs from 'Constants';
import './Payment.css';

function Payment() {
  const [name] = useState('John Doe');
  const [packageName] = useState('Halifax');
  const [amount] = useState(1000);
  const [promoCode, setPromoCode] = useState('');
  const [discountedAmount, setDiscountedAmount] = useState(amount);
  const [submitted, setSubmitted] = useState(false);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);

    if (e.target.value === 'tripngo') {
      setDiscountedAmount(amount * 0.85);
    } else {
      setDiscountedAmount(amount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userId: localStorage.getItem('userId') ?? 1,
      packageName,
      amount: discountedAmount,
    };

    try {
      const response = await axios.post(APIs.PAYMENT, formData);
      if (response.data.success) {
        window.location.href = response.data.data.link;
      } else {
        throw new Error('Failed to create payment session');
      }
      setPromoCode('');
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="payment-container">
          <div className="payment-overlay">
            <h1 className="payment-title">Payment</h1>
            <p className="payment-subtitle label">Name:</p>
            <p className="payment-subtitle">{name}</p>
            <p className="payment-subtitle label">Package Name:</p>
            <p className="payment-subtitle">{packageName}</p>
            <p className="payment-subtitle label">Amount:</p>
            <p className="payment-subtitle">${amount}</p>
            <p className="payment-subtitle label">Discounted Amount:</p>
            <p className="payment-subtitle">${discountedAmount.toFixed(2)}</p>
            <Row className="form-container">
              <Col lg={12} md={12} sm={12}>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={`form-control`}
                      placeholder="Enter Promo Code"
                      value={promoCode}
                      onChange={handlePromoCodeChange}
                    />
                  </div>
                  <div className="button-container">
                    <button type="submit" className="button button-secondary button-100p">
                      Submit
                    </button>
                  </div>
                  {submitted && <p className='submitted-message'>Payment submitted. Thank you!</p>}
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Payment;
