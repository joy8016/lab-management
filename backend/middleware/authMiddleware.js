import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Read token from cookies or Authorization header
  if (req.cookies && req.cookies.token && req.cookies.token !== 'none') {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token || token === 'none') {
    return res.status(200).json({
      success: false,
      exists: false,
      expired: false,
      message: 'No authorization token provided',
    });
  }

  try {
    // Verify token & expiration timing window
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify user exists in database
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(200).json({
        success: false,
        exists: false,
        expired: false,
        message: 'User no longer exists in database',
      });
    }

    next();
  } catch (error) {
    const isExpired = error.name === 'TokenExpiredError';
    return res.status(200).json({
      success: false,
      exists: false,
      expired: isExpired,
      message: isExpired
        ? 'Authorization token has expired. Please register or login again.'
        : 'Invalid authorization token',
    });
  }
};
