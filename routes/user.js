// routes/user.js
const express = require('express');
const User = require('../models/User');
const { requireAuth } = require('../middleware/authorization');

const router = express.Router();

router.get('/user-info', requireAuth, async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Other user information routes
// ...

module.exports = router;
