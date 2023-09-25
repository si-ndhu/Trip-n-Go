// Author: Parshva Shah

const express = require('express');
const router = express.Router();
const { db } = require('../conn');
const bcrypt = require('bcryptjs');

router.post('/', async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const database = await db();
  const usersCollection = database.collection('Authentication');

  try {
    // Find the user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await usersCollection.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Error updating password' });
  }
});

module.exports = router;
