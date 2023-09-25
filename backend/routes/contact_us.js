// Author: Abhishek Bhatt

var express = require('express');
var router = express.Router();
var { ObjectId } = require('mongodb');
const { db } = require('../conn');

/* POST contact us information */
router.post('/', async function (req, res) {
  const { name, email, message } = req.body;
  const database = await db();

  try {
    const result = await database.collection('ContactUs').insertOne({ name, email, message });
    const insertedDocument = await database.collection('ContactUs').findOne({ _id: result.insertedId });
    res.status(201).json(insertedDocument);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

/* GET contact us information by id */
router.get('/:id', async function (req, res) {
  const id = req.params.id;
  const database = await db();

  try {
    const message = await database.collection('ContactUs').findOne({ _id: ObjectId(id) });
    if (!message) {
      return res.status(404).json({ error: 'Contact message not found.' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

/* GET all contact us messages */
router.get('/', async function (req, res) {
  const database = await db();

  try {
    const messages = await database.collection('ContactUs').find({}).toArray();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

/* DELETE contact us information by id */
router.delete('/:id', async function (req, res) {
  const id = req.params.id;
  const database = await db();

  try {
    const result = await database.collection('ContactUs').deleteOne({ _id: ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact message not found.' });
    }

    res.json({ message: 'Contact message deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
