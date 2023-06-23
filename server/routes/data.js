const express = require('express');
const router = express.Router();


// Route to fetch countries
router.get('/countries', (req, res) => {
  res.json(countries);
});

// Route to fetch states based on country ID
router.get('/states', (req, res) => {
  const { country } = req.query;
  const countryStates = states[country] || [];
  res.json(countryStates);
});

// Route to fetch cities based on state ID
router.get('/cities', (req, res) => {
  const { state } = req.query;
  const stateCities = cities[state] || [];
  res.json(stateCities);
});

module.exports = router;
