// Author: Abhishek Bhatt

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import APIs from 'Constants';
import './ContactList.css';

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get(APIs.CONTACT_US)
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${APIs.CONTACT_US}/${id}`)
      .then((response) => {
        setContacts(contacts.filter(contact => contact._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="background-image">
      <div className="central-container">
        <div className="contact-list-container">
          <h1 className="title">Contact List</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td><button className="delete-button" onClick={() => handleDelete(contact._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
