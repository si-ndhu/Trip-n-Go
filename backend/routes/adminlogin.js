// Author: Parshva Shah

var express = require('express');
var router = express.Router();
const {db} = require("../conn");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

router.use(cors()); 

router.post('/', async function(req,res,next)  {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    const database = await db();
    const existingUsers = database.collection("Authentication");
  
    try {
      // Check if the user exists in the database
      const validateUser = await existingUsers.findOne({ email });
      if (!validateUser) {
        return res.status(404).json({ message: 'User does not exist! Please enter correct email or Signup' });
      }

      // Compare the password provided with the hashed password stored in the database
      const checkPasswords = await bcrypt.compare(password, validateUser.password);
      if (!checkPasswords) {
        return res.status(403).json({ message: 'Invalid password' });
      }

      if (validateUser.role !== "admin") {
        return res.status(401).json({ message: 'User is not authorized as an admin' });
      }
  
      const userData = {
        email: validateUser.email,
        username: validateUser.username,
        role: validateUser.role
      };

      return res.status(200).json({ user: userData });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Error logging in' });
    }
  });
  
  module.exports = router;