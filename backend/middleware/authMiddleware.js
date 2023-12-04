const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.js');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log("Hello"+ req);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      console.log(req.user);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

const admin_seller = (req, res, next) => {
  if (req.user && req.user.isAdminSeller) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin seller');
  }
};

const admin_or_seller = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isAdminSeller)) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin or admin seller');
  }
};

module.exports = { protect, admin, admin_seller, admin_or_seller };
