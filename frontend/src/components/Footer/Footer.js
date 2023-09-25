// Author: Rahul Saliya

import { Col, Row } from "react-bootstrap";
import "./Footer.css";
import { FaTwitter, FaFacebookF, FaGooglePlusG, FaRss } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  let navigate = useNavigate();

  return (
    <div className="footer">
      <Row className="justify-content-md-center">
        <Col
          lg={3}
          className="logo_col"
        >
          <span
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            Trip'nGo
          </span>
          <span className="slogan">Let the Journey Begin!</span>
        </Col>
        <Col
          lg={2}
        >
          <ul className="footerColumn">
            <li className="header">Pages</li>
            <li
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </li>
            <li>Trips</li>
            <li>Maps</li>
          </ul>
        </Col>
        <Col
          lg={2}
        >
          <ul className="footerColumn">
            <li className="header">More</li>
            <li>News</li>
            <li>Blogs</li>
            <li>Job Offerings</li>
          </ul>
        </Col>
        <Col
          lg={2}
        >
          <ul className="footerColumn">
            <li className="header">About</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Report an Issue</li>
          </ul>
        </Col>
      </Row>

      <hr className="footer_hr" />

      <div className="footer_icon_container">
        <FaFacebookF className="footer_icon" />
        <FaGooglePlusG className="footer_icon" />
        <FaRss className="footer_icon" />
        <FaTwitter className="footer_icon" />
      </div>

      <div className="footer_text">
        © 2023 Company, Inc. All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
