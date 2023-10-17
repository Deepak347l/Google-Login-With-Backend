// middleware/authorization.js
function requireAuth(req, res, next) {
    if (req.session.isAuthenticated) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
  
  module.exports = { requireAuth };
  