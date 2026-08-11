import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Normalize role strings (e.g. 'Lab Technician' -> 'lab-technician')
const normalizeRole = (r) => {
  if (!r) return '';
  return r.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// Send response helper with token
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

  const isProd = process.env.NODE_ENV === 'production';
  const isLocalHost = res.req?.headers?.host?.includes('localhost') || res.req?.headers?.host?.includes('127.0.0.1');

  const options = {
    expires: new Date(
      Date.now() + (parseInt(process.env.COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: isProd && !isLocalHost,
    sameSite: 'lax',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
};

// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all fields',
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email. Please register with a different email not in our database.',
      });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error during registration',
      error: error.message,
    });
  }
};

// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password',
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error during login',
      error: error.message,
    });
  }
};

// @desc    Logout User
// @route   GET /api/auth/logout
// @access  Public
export const logout = async (req, res) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error during logout',
      error: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(200).json({
        success: false,
        exists: false,
        message: 'User not found in database',
      });
    }

    res.status(200).json({
      success: true,
      exists: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching user profile',
      error: error.message,
    });
  }
};

// @desc    Verify role access & token validity when role card is clicked
// @route   POST /api/auth/verify-role
// @access  Private
export const verifyRole = async (req, res) => {
  try {
    const { requestedRole } = req.body;

    const user = await User.findById(req.user._id || req.user.id).select('-password');
    if (!user) {
      return res.status(200).json({
        success: false,
        exists: false,
        expired: false,
        roleMismatch: false,
        message: 'User does not exist in database',
      });
    }

    const userNormalizedRole = normalizeRole(user.role);
    const reqNormalizedRole = normalizeRole(requestedRole);

    // Role-based Access Check:
    // If requestedRole does NOT match user's registered role, return roleMismatch = true (with 200 status to avoid console errors)
    if (reqNormalizedRole && userNormalizedRole !== reqNormalizedRole) {
      return res.status(200).json({
        success: false,
        exists: true,
        expired: false,
        roleMismatch: true,
        userRole: user.role,
        requestedRole,
        message: `Account is registered as ${user.role}, not ${requestedRole}. Please register with a different email for this role.`,
      });
    }

    // Role matches, user exists, and token is valid!
    res.status(200).json({
      success: true,
      exists: true,
      expired: false,
      roleMismatch: false,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      exists: false,
      message: 'Role verification failed',
      error: error.message,
    });
  }
};
