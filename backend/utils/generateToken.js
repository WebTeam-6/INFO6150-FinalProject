const jwt = require('jsonwebtoken');

const generateToken = (id,isAdmin) => {
  return jwt.sign({ id ,    isAdmin
  }, process.env.JWT_SECRET, {
    expiresIn: '3h',
  });
};

module.exports = generateToken;
