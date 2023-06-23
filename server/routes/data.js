require('dotenv').config();
const express = require('express');

const router = express.Router();
const { Country, State, City } = require('../models');
const { connect, connection } = require('mongoose');


const dbConnectionString = process.env.DB_CONNECTION_STRING;
connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a connection object
const db = connection;

// Event handlers for successful connection and error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Route to fetch countries
router.get('/countries', async (req, res) => {
  try {
    const countries = await Country.find({}, 'name');
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving countries from the database');
  }
});

router.get('/states', async (req, res) => {
  const { country } = req.query;
  try {
    // Find the country by name
    const countryObj = await Country.findOne({ name: country });
    if (!countryObj) {
      return res.status(404).json({ error: 'Country not found' });
    }

    // Retrieve states based on the country ObjectId
    const states = await State.find({ country: countryObj._id }, 'name');
    res.json(states);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving states from the database');
  }
});


// Route to fetch cities based on state ID
// router.get('/cities', async (req, res) => {
//   const { state } = req.query;
//   try {
//     const cities = await City.find({ state: state }, 'name');
//     res.json(cities);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving cities from the database');
//   }
// });
router.get('/cities', async (req, res) => {
  const { state } = req.query;
  try {
    const stateObj = await State.findOne({ name: state });
    if (!stateObj) {
      return res.status(404).json({ error: 'State not found' });
    }
    const cities = await City.find({ state: stateObj._id }, 'name');
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving cities from the database');
  }
});


module.exports = router;
