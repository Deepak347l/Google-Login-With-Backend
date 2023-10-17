const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

// Use bodyParser to parse JSON requests.
app.use(bodyParser.json());

// Secret key for signing JWT tokens. Keep this secret and use a strong, unique key.
const jwtSecret = 'oni016ig3jl7c915nf4ntvanj9sscikn';

// Create a Google OAuth2 client instance with your client ID.
const googleClientId = '600218617565-oni016ig3jl7c915nf4ntvanj9sscikn.apps.googleusercontent.com';
const client = new OAuth2Client(googleClientId);

// Handle POST requests to your login endpoint.
app.post('/api/login', async (req, res) => {
  try {
    // Get the ID token from the request body.
    const idToken = req.body.id_token;

    // Verify the ID token using the Google API client library.
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();

    if (payload) {
      // Authentication successful. You can generate a session token here.
      const userId = payload.sub;
      const sessionToken = generateSessionToken(userId);
      // Respond with the session token.
      res.status(200).json({ sessionToken,userId });
    
    } else {
      // Authentication failed.
      res.status(401).send('Authentication failed');
    }
  } catch (error) {
    // Handle errors.
    res.status(500).send('Server error:'+error);
  }
});

// Function to generate a session token.
function generateSessionToken(userId) {
  // Generate a session token for the user.
  // You can use a library like jsonwebtoken (JWT) to create a secure token.
  // Return the token.
 // Define the payload (claims) for the JWT.
 const payload = {
  sub: userId,               // Subject (user ID)
  iat: Math.floor(Date.now() / 1000),   // Issued at (current time in seconds)
  exp: Math.floor(Date.now() / 1000) + 3600,  // Expiration time (1 hour from now)
};
// Sign the JWT using your secret key.
const token = jwt.sign(userId, jwtSecret, { algorithm: 'HS256' });

return token;

}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
