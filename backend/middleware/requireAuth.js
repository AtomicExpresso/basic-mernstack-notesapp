const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Middleware to require authentication for making changes to a user's notes
const requireAuth = async (req, res, next) => {
  // Verify authorization was included from request headers
  const { authorization } = req.headers;

  // Check if the authorization token is present in the request headers
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization required, did you include a token in your request?' });
  }

  // Extract the token from the authorization header (assuming the format is "Bearer <token>")
  const token = authorization.split(' ')[1];

  try {
    // Verify the token and extract the user ID (_id) from the payload
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Query the database to find the user by _id and attach the user ID to the request object
    // The .select('_id') method ensures that only the _id field is returned
    req.user = await userModel.findOne({ _id }).select('_id');

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;