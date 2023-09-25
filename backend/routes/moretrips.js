//Author : Sai Sindhu Bhimavarapu

var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());
const { db } = require('../conn');

/* GET all packages */
router.get('/allPackages', async function (req, res) {
    const database = await db();
    try {
      const collection = database.collection('TravelPackages'); 
      const trips = await collection.find({}).toArray();  

      res.json(trips);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });

  
/* GET packages list by location */
router.get('/filterByLocation', async function (req, res) {
    const location = req.query.location;
    const database = await db();    
    try {
      const collection = database.collection('TravelPackages'); 
      const trips = await collection.find({ location: location }).toArray();

      res.json(trips);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });

/* GET packages list by price range */
router.get('/filterByPrice', async function (req, res) {
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);

    if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < minPrice) {
      return res.status(400).json({ error: 'Invalid price range' });
    }
    
    const database = await db();    
    try {
      const collection = database.collection('TravelPackages'); 
      const trips = await collection.find({ cost: { $gte: minPrice, $lte: maxPrice } }).toArray();
      
      res.json(trips);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });
  
  module.exports=router;