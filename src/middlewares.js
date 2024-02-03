const jwt = require("jsonwebtoken");


function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

const authenticateToken = (req, res, next) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token form callback' });
    }

    console.log(decoded);
    // Token is valid, attach the decoded user information to the request
    req.user = decoded;
    next();
  });
};



module.exports = {
  notFound,
  errorHandler,
  authenticateToken,
};
