// Author: Rahul Saliya

import "./Header.css";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { Container } from "react-bootstrap";
import { HiMenu } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, useLocation } from "react-router-dom";
import APIs from "Constants";
import axios from "axios";
import io from "socket.io-client";

async function listenForNotifications(onNotification) {
  const userId = localStorage.getItem("userId") ?? 1;
  const email = localStorage.getItem("email");
  const socket = io(APIs.SOCKET_URL, {
    query: {
      userId: userId,
      email: sessionStorage.getItem("email"),
    },
  });
  socket.on("connect", () => {
    // console.log("Connected to server");
  });

  socket.on("message", (message) => {
    // console.log("Received message:", message);
    if (onNotification && typeof onNotification === "function")
      onNotification(message);
  });

  socket.on("disconnect", () => {
    // console.log("Disconnected from server");
  });

  return socket;
}

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") ?? 1);
  const [email, setEmail] = useState(localStorage.getItem("email") ?? 2);
  const location = useLocation();
  const navigate = useNavigate();

  // on local storage change, update userId
  window.addEventListener("storage", () => {
    const id = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    setUserId(id);
    setEmail(email);
  });

  var menuItems = React.useMemo(() => {
    const withoutLoginItems = ["Home", "FAQs", "Contact", "Login"];
    const withLoginItems = ["Home", "FAQs", "Contact"];
    return userId && userId !== "undefined"
      ? withLoginItems
      : withoutLoginItems;
  }, [userId]);
  var navPaths = React.useMemo(() => {
    const withoutLoginItems = ["/", "faqs", "contact-us", "login"];
    const withLoginItems = ["/", "faqs", "contact-us"];
    const id = localStorage.getItem("userId");
    setUserId(id);
    return userId && userId !== "undefined"
      ? withLoginItems
      : withoutLoginItems;
  }, [userId]);

  const [currentKey, setCurrentKey] = useState(menuItems[0]);

  React.useEffect(() => {
    const path = location.pathname.split("/")[1];

    const restrictedPaths = [
      "/order-details",
      "/profilepage",
      "/admin",
      "/admin/contact-list",
      "/payment",
    ];

    if (restrictedPaths.includes(location.pathname)) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login", {
          state: {
            errorMessage: "Please login to continue.",
          },
        }); return;
      }
    }

    if (path === "/" || path === "") {
      setCurrentKey("Home");
    } else {
      const index = navPaths.indexOf(path);
      if (index !== -1) setCurrentKey(menuItems[index]);
      else setCurrentKey(path);
    }
  }, [location, menuItems, navPaths, navigate]);

  React.useEffect(() => {
    listenForNotifications((message) => {
      setIsNewNotification(!showNotifications && true);
      setNotifications([message, ...notifications]);
    });
  }, [showNotifications, notifications]);

  React.useEffect(() => {
    axios.get(`${APIs.NOTIFICATIONS}/${userId}`).then((res) => {
      const noti = [];
      for (let i = res.data.length - 1; i >= 0; i--) {
        noti.push(res.data[i]);
      }
      setNotifications(noti);
    });
  }, [userId]);

  return (
    <div className="nav-bar-container">
      <Modal
        className="notification-popup"
        show={showNotifications}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          className="notification-header"
          closeButton
          onHide={() => {
            setShowNotifications(false);
          }}
          closeVariant="white"
        >
          <IoIosNotifications className="notification-popup-icon" />

          <Modal.Title id="contained-modal-title-vcenter">
            Notifications ({notifications.length})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="notification-container">
          {notifications.map((notification, idx) => (
            <div
              key={idx}
              onClick={() => {
                setShowNotifications(false);
                const url = notification.payload.url;
                if (url) {
                  navigate(url);
                }
              }}
              className="notification-item"
            >
              <span className="notification-title">{notification.title}</span>
              <span className="notification-description">
                {notification.description}
              </span>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <Container className="nav-bar">
        <div className="logo-container">
          <span
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            Trip'nGo
          </span>
          <HiMenu
            className={"hamburger-icon " + (showOptions ? "active" : "")}
            onClick={() => {
              setShowOptions(!showOptions);
            }}
          />
        </div>
        <div className={"menu " + (showOptions ? "" : "hide")}>
          {menuItems.map((d, index) => (
            <div className="menu-item" key={index}>
              <span
                className={"menu-button " + (currentKey === d ? "active" : "")}
                onClick={() => {
                  setCurrentKey(d);
                  navigate(navPaths[index]);
                  showOptions && setShowOptions(false);
                }}
              >
                {d}
              </span>
            </div>
          ))}
          <div className="menu-item">
            <span
              className={
                "wishlist-text menu-button " +
                (currentKey === "wishlist" ? "active" : "")
              }
              onClick={() => {
                showOptions && setShowOptions(false);
                setShowWishlist(!showWishlist);
                navigate("/wishlist");
              }}
            >
              Wishlist
            </span>
            <FiShoppingBag
              className={`wishlist-icon ${currentKey === "wishlist" ? "active" : ""
                }`}
              onClick={() => {
                navigate("/wishlist");
              }}
            />
          </div>

          {userId && userId !== "undefined" && (
            <div className="menu-item">
              <span
                className={
                  "notification-text menu-button " +
                  (currentKey === "Notifications" ? "active" : "")
                }
                onClick={() => {
                  setCurrentKey("Notifications");
                  showOptions && setShowOptions(false);
                  setShowNotifications(!showNotifications);
                }}
              >
                Notifications
              </span>
              <div className="notification-dot-container">
                <IoIosNotifications
                  className="notification-icon"
                  onClick={() => {
                    setIsNewNotification(false);
                    setShowNotifications(!showNotifications);
                  }}
                />
                {isNewNotification && <div className="notification-dot"></div>}
              </div>
            </div>
          )}

          {userId && userId !== "undefined" && (
            <div
              className="menu-item"
            >
              <span
                className={
                  "profile-text menu-button " +
                  (currentKey === "Profile" ? "active" : "")
                }
                onClick={() => {
                  showOptions && setShowOptions(false);
                  setCurrentKey("Profile");
                  navigate("/profilePage");
                }}
              >
                Profile
              </span>
              <div className="profile-container" onClick={() => {
                const dropdownBasic = document.getElementById("dropdown-basic");
                dropdownBasic.click();
              }}>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{
                    visibility: "hidden",
                    position: "absolute",
                    marginTop: "-10px",
                  }}>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => {
                      e.preventDefault();
                      navigate("/profilePage");
                    }}>Profile</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {
                      e.preventDefault();
                      localStorage.clear();
                      sessionStorage.clear();
                      window.location.href = "/";
                    }}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <FaUser className="profile-icon" />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
