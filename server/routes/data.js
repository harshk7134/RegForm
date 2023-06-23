require('dotenv').config();
const express = require('express');

const router = express.Router();
const { Country, State, City,User } = require('../models');
const { connect, connection } = require('mongoose');


const dbConnectionString = process.env.DB_CONNECTION_STRING;
connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


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
    
    const countryObj = await Country.findOne({ name: country });
    if (!countryObj) {
      return res.status(404).json({ error: 'Country not found' });
    }

    const states = await State.find({ country: countryObj._id }, 'name');
    res.json(states);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving states from the database');
  }
});

router.post('/user-data', async (req, res) => {
     console.log(req.body);
  
  
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    email: req.body.email,
    country: req.body.countries,
    state: req.body.state,
    city: req.body.city,
    dob: req.body.dateOfBirth,
    age: req.body.age,
  }
  )

  console.log(user);
  
   

  try {
    const newUser = await user.save();
    res.json(newUser);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Error saving the user');
  }
});





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
