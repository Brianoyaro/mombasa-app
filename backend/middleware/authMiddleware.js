const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Should be in env

function authenticateToken(req, res, next) {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  const token = req.cookies.token;
  // console.log(req.cookies)

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user; // Add user data to the request object
    next();
  });
}

module.exports = { authenticateToken };