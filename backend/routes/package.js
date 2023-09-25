// Author: Rahul Saliya

var express = require('express');
var router = express.Router();
const { db } = require("../conn");
const { ObjectId } = require('mongodb');

// url will be package/id
router.get('/:id', async function (req, res, next) {
    const id = req.params.id;

    const database = await db();

    const package = await database.collection("TravelPackages").findOne({ _id: ObjectId(id) });

    res.json(package);
});

module.exports = router;