// Author: Abhishek Bhatt

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './ContactUs.css';
import axios from 'axios';
import APIs from 'Constants';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (Object.keys(errors).length === 0) {
      const formData = {
        name: name,
        email: email,
        message: message
      };

      // Convert formData to JSON
      const jsonData = JSON.stringify(formData);

      axios.post(APIs.CONTACT_US, formData)
        .then((response) => {
          console.log(response.data);
          setSubmitted(true);
        })
        .catch((error) => {
          console.log(error);
        });
      // Perform actions with the jsonData (e.g., send it to the server)
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="background-image">
      <Container className='central-container'>
        <div className='contact-us-container'>
          <div className='contact-us-overlay'>
            <h1 className='title'>Contact Us</h1>
            <p className='subtitle'>Have any questions or feedback? Let us know!</p>
          </div>
          <Row className='form-container'>
            <Col lg={12} md={12}>
              <form onSubmit={handleSubmit} >
                <div className='form-group'>
                  <input
                    type='text'
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder='Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder='Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>
                <div className='form-group'>
                  <textarea
                    className='form-control'
                    rows='5'
                    placeholder='Your Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="button-container">
                  <button type='submit' className='button button-secondary button-100p'>
                    Submit
                  </button>
                </div>
                {submitted && <p className='submitted-message'>Response submitted. Thank you!</p>}
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default ContactUs;
