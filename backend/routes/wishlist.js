const express = require('express');
const router = express.Router();
const { db } = require('../conn');
const { ObjectId } = require('mongodb');


/* POST wish list packages id */
// router.post('/packages',  async(req, res) => {

//     console.log("serverhit");
//     const ids = req.body.id; // Get the array of ids from the request body
//     console.log(ids);
//     const database = await db();
//     console.log("serverhit");
//     try {
//       const packageDetails = await database.collection('TravelPackages').find({ id: { $in: ids } }).toArray();
//       if (!packageDetails || packageDetails.length === 0) {
//         return res.status(404).json({ error: 'No such package found.' });
//       }
//       res.status(200).json(packageDetails)
//     } catch (error) {
//       res.status(500).json({ error: error.toString() });
//     } 
//   })
/* POST wish list packages id */
router.post('/packages',  async(req, res) => {

    console.log("serverhit");
    const ids = req.body.id; // Get the array of ids from the request body
    console.log(ids);
    const database = await db();
    console.log("serverhit");
    try {
      const objectIds = ids.map(id => ObjectId(id));
      const packageDetails = await database.collection('TravelPackages')
        .find({ _id: { $in: objectIds } })
        .toArray();

      // const packageDetails = await database.collection('TravelPackages').find({ _id: ObjectId(ids) }).toArray();
      if (!packageDetails || packageDetails.length === 0) {
        return res.status(404).json({ error: 'No such package found.' });
      }
      res.status(200).json(packageDetails)
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    } 
  })

module.exports = router
