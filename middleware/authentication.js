// middleware/authentication.js
const jwt = require('jsonwebtoken');
const jwtSecret = 'oni016ig3jl7c915nf';

function generateSessionToken(userId) {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  };
  return jwt.sign(payload, jwtSecret, { algorithm: 'HS256' });
}

function verifySessionToken(sessionToken) {
  try {
    const decoded = jwt.verify(sessionToken, jwtSecret);
    return decoded.sub;
  } catch (error) {
    return null;
  }
}

module.exports = { generateSessionToken, verifySessionToken };
