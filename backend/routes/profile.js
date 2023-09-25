// Author: Siddhesh Salve

var express = require("express");
var router = express.Router();
const { db } = require("../conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const app = express();

// Parse incoming requests with body-parser
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

router.use(cors());

router.post("/", async function (req, res, next) {
  const { email } = req.body;
  console.log(email);
  //return res.status(200).json({ email: email });
  const database = await db();
  try {
    // Find the document in the collection that matches the given email
    const user = await database.collection("UserProfile").findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If the user is found, return the entire JSON data as the response
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async function (req, res, next) {
  const { id } = req.params; // Get the ID from the request URL
  const updatedData = req.body; // Get the updated data from the request body
  console.log(id, updatedData);

  const database = await db();
  try {
    // Convert the string ID to an ObjectId
    const objectId = new ObjectId(id);

    console.log(objectId);
    // Find the document in the collection that matches the given ID
    const user = await database
      .collection("UserProfile")
      .findOne({ _id: objectId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user data with the new values from the request body
    // Note: You can choose which fields are allowed to be updated based on your requirements
    user.name = updatedData.name || user.name;
    user.age = updatedData.age || user.age;
    user.gender = updatedData.gender || user.gender;
    user.dateOfBirth = updatedData.dateOfBirth || user.dateOfBirth;
    user.city = updatedData.city || user.city;
    user.bio = updatedData.bio || user.bio;
    user.street = updatedData.street || user.street;
    user.addressCity = updatedData.addressCity || user.addressCity;
    user.state = updatedData.state || user.state;
    user.country = updatedData.country || user.country;
    user.email = updatedData.email || user.email;
    user.phone = updatedData.phone || user.phone;

    // Save the updated user document back to the database
    await database
      .collection("UserProfile")
      .updateOne({ _id: objectId }, { $set: user });

    // Return the updated user data as the response
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating data in MongoDB:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/image/:id", async function (req, res, next) {
  const { id } = req.params; // Get the ID from the request URL
  const { profileImage } = req.body;
  const database = await db();
  try {
    // Convert the string ID to an ObjectId
    const objectId = new ObjectId(id);

    // Find the document in the collection that matches the given ID
    const user = await database
      .collection("UserProfile")
      .findOne({ _id: objectId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save the updated user document back to the database
    console.log(profileImage);
    await database
      .collection("UserProfile")
      .updateOne({ _id: objectId }, { $set: { profileImage: profileImage } });

    // Return the updated user data as the response
    return res.status(200).json({ message: "image updated!" });
  } catch (error) {
    console.error("Error updating image in MongoDB:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
