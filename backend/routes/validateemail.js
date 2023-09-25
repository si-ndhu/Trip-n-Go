// Author: Parshva Shah

var express = require('express');
var router = express.Router();
const { db } = require("../conn");

router.post('/', async function (req, res, next) {
  const { email } = req.body;
  const database = await db();
  const existingEmail = database.collection("Authentication");

  try {
    // Check if the email exists in the database
    const user = await existingEmail.findOne({ email });
    if (user) {
      // Email exists, return true
      return res.json({ exists: true });
    } else {
      // Email does not exist, return false
      return res.json({ exists: false });
    }

  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: 'Error checking email' });
  }
});

module.exports = router;
