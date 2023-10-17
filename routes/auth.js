// routes/auth.js
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { generateSessionToken } = require('../middleware/authentication');

const router = express.Router();
const client = new OAuth2Client('600218617565-oni016ig3jl7c915nf4ntvanj9sscikn.apps.googleusercontent.com');

router.post('/google-signin', async (req, res) => {
  const idToken = req.body.idToken;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: '600218617565-oni016ig3jl7c915nf4ntvanj9sscikn.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();

    if (payload) {
      const googleId = payload.sub;
      let user = await User.findOne({ googleId });

      if (!user) {
        const { name, email } = payload;
        user = new User({ googleId, name, email });
        await user.save();
      }

      const sessionToken = generateSessionToken(user._id);
      req.session.isAuthenticated = true;

      res.status(200).json({ sessionToken });
    } else {
      res.status(401).send('Authentication failed');
    }
  } catch (error) {
    res.status(500).send('Server error'+error);
  }
});

// Other authentication and registration routes
// ...

module.exports = router;
