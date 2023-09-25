// Author: Parshva Shah

var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const { db } = require("../conn");
const cors = require('cors');

router.use(cors());
router.post("/", async function (req, res, next) {
  const { username, email, password } = req.body;
  console.log("Taking userdata");

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const database = await db();
  const usersData = database.collection("Authentication");

  try {
    // Check if the email already exists in the database
    const existingUser = await usersData.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user object
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    // Insert the new user into the database
    await usersData.insertOne(newUser);

    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({ message: "Error signing up" });
  }
});

module.exports = router;
