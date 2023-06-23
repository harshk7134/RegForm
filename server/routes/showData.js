const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/showData', async (req, res) => {
  try {

    const users = await User.find();

    res.render('showData', { users });
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'An error occurred while retrieving user data' });
  }
});

module.exports = router;
