// Author: Siddhesh Salve

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Card, Button, Modal } from "react-bootstrap";
import "./ProfilePage.css";
import axios from "axios";
import APIs from "Constants";

function ProfilePage() {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditImageModal, setShowEditImageModal] = useState(false);
  const email = window.localStorage.getItem("email");
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    bio: "",
    street: "",
    addressCity: "",
    state: "",
    country: "",
    email: "",
    phone: "",
    profileImage: "",
  });

  useEffect(() => {
    console.log("in use effect");
    console.log("in use effect to get details");

    getUserDetails();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClick = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  const handleShowEditImageModal = () => {
    setShowEditImageModal(true);
  };

  const handleCloseEditImageModal = () => {
    const userId = userData._id;

    // Get the input element for the image file
    const imageInput = document.getElementById("imageUpload");

    // Check if an image file is available
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      const reader = new FileReader();

      // Convert the image file to base64
      reader.onload = () => {
        const base64Image = reader.result;
        console.log(base64Image);
        const formData = new FormData();
        formData.append("image", base64Image);

        // Make the PUT request to update the user's image
        axios
          .post(APIs.PROFILE + `/image/${userId}`, {
            profileImage: base64Image,
          })
          .then((response) => {
            console.log("Image updated successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error updating image:", error.response.data);
          });
      };

      // Read the image file as a data URL (base64)
      reader.readAsDataURL(file);
    }

    setShowEditImageModal(false);
  };

  const onSubmit = (data) => {
    setUserData(data);
    setShowEditProfileModal(false);
    console.log(data);
  };

  const getUserDetails = () => {
    console.log("in user details");
    axios
      .post(APIs.PROFILE, {
        email,
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        profileImage: e.target.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const updateData = () => {
    // Create an object containing the data to be updated
    const updatedData = {
      name: userData.name,
      age: userData.age,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
      city: userData.city,
      bio: userData.bio,
      street: userData.street,
      addressCity: userData.addressCity,
      state: userData.state,
      country: userData.country,
      email: userData.email,
      phone: userData.phone,
    };

    console.log(updatedData);
    // Make the PUT request to update the user data
    axios
      .put(APIs.PROFILE + `/${userData._id}`, updatedData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error.response.data);
      });
  };

  return (
    <div className="background-image">
      <Container className="central-container">
        <div className="login-container">
          <div className="login-overlay">
            <h1 className="title">Welcome</h1>
          </div>

          <Container>
            <Row>
              <Col sm={12}>
                <Card className="h-100">
                  <Card.Body className="text-center">
                    <div
                      style={{
                        maxWidth: "150px",
                        margin: "0 auto",
                      }}
                    >
                      <img
                        src={userData.profileImage}
                        style={{ width: "100%", height: "auto" }}
                        className="mb-3"
                        alt="Profile"
                      />
                    </div>

                    <Card.Title className="mt-2">{userData.name}</Card.Title>

                    <div>
                      <Button
                        variant="info"
                        onClick={handleShowEditImageModal}
                        className="button button-secondary responsive-button"
                      >
                        Edit Profile Picture
                      </Button>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <div>
                        <Button
                          className="button button-secondary responsive-button"
                          variant="info"
                          value="Edit profile modal will be opened"
                          onClick={handleClick}
                        >
                          Edit Profile
                        </Button>
                      </div>
                      <div>
                        <Button
                          className="button button-secondary responsive-button"
                          variant="info"
                          value="Edit profile modal will be opened"
                          onClick={(e) => {
                            e.preventDefault();
                            localStorage.clear();
                            sessionStorage.clear();
                            window.location.href = "/";
                          }}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col sm>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>Personal Information</Card.Title>
                    <ul className="list-unstyled">
                      <li>Name: {userData.name}</li>
                      <li>Age: {userData.age}</li>
                      <li>Gender: {userData.gender}</li>
                      <li>Date of birth: {userData.dateOfBirth}</li>
                      <li>City: {userData.city}</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>Address Information</Card.Title>
                    <ul className="list-unstyled">
                      <li>Street: {userData.street}</li>
                      <li>City: {userData.city}</li>
                      <li>State: {userData.state}</li>
                      <li>Country: {userData.country}</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm>
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>Contact Information</Card.Title>
                    <ul className="list-unstyled">
                      <li>Email: {userData.email}</li>
                      <li>Phone: {userData.phone}</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>

      {/* Edit Profile Modal */}
      <Modal show={showEditProfileModal} onHide={handleClick} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                {...register("name", {
                  required: "Name is required",
                })}
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                id="age"
                {...register("age", {
                  required: "Age is required",
                  min: {
                    value: 18,
                    message: "Age must be at least 18",
                  },
                  max: {
                    value: 100,
                    message: "Age must be at most 100",
                  },
                })}
                value={userData.age}
                onChange={(e) =>
                  setUserData({ ...userData, age: e.target.value })
                }
              />
              {errors.age && (
                <div className="invalid-feedback">{errors.age.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                className={`form-control ${errors.gender ? "is-invalid" : ""}`}
                id="gender"
                {...register("gender", {
                  required: "Gender is required",
                })}
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""
                  }`}
                id="dob"
                {...register("dateOfBirth", {
                  required: "Date of Birth is required",
                })}
                value={userData.dateOfBirth}
                onChange={(e) =>
                  setUserData({ ...userData, dateOfBirth: e.target.value })
                }
              />
              {errors.dateOfBirth && (
                <div className="invalid-feedback">
                  {errors.dateOfBirth.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                id="city"
                {...register("city", {
                  required: "City is required",
                })}
                value={userData.city}
                onChange={(e) =>
                  setUserData({ ...userData, city: e.target.value })
                }
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city.message}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                className={`form-control ${errors.street ? "is-invalid" : ""}`}
                id="street"
                {...register("street", {
                  required: "Street is required",
                })}
                value={userData.street}
                onChange={(e) =>
                  setUserData({ ...userData, street: e.target.value })
                }
              />
              {errors.street && (
                <div className="invalid-feedback">{errors.street.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="addressCity">Address City:</label>
              <input
                type="text"
                className={`form-control ${errors.addressCity ? "is-invalid" : ""
                  }`}
                id="addressCity"
                {...register("addressCity", {
                  required: "Address City is required",
                })}
                value={userData.addressCity}
                onChange={(e) =>
                  setUserData({ ...userData, addressCity: e.target.value })
                }
              />
              {errors.addressCity && (
                <div className="invalid-feedback">
                  {errors.addressCity.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                className={`form-control ${errors.state ? "is-invalid" : ""}`}
                id="state"
                {...register("state", {
                  required: "State is required",
                })}
                value={userData.state}
                onChange={(e) =>
                  setUserData({ ...userData, state: e.target.value })
                }
              />
              {errors.state && (
                <div className="invalid-feedback">{errors.state.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                className={`form-control ${errors.country ? "is-invalid" : ""}`}
                id="country"
                {...register("country", {
                  required: "Country is required",
                })}
                value={userData.country}
                onChange={(e) =>
                  setUserData({ ...userData, country: e.target.value })
                }
              />
              {errors.country && (
                <div className="invalid-feedback">{errors.country.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                id="phone"
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^\d{10}$/i,
                    message: "Invalid phone number",
                  },
                })}
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone.message}</div>
              )}
            </div>
            <Button type="submit" onClick={updateData} variant="primary">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Image Modal */}
      <Modal show={showEditImageModal} onHide={handleCloseEditImageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload your new Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditImageModal}>
            Close
          </Button>
          <div>
            <Button variant="primary" onClick={handleCloseEditImageModal}>
              Save Changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfilePage;
