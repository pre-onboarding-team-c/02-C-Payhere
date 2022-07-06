const jwt = require('jsonwebtoken');

const generateAccessToken = user => {
  return jwt.sign(
    {
      type: 'access_token',
      id: user.id,
    },
    process.env.JWT_ACCESS_SECRET_KEY,
    {
      issuer: 'teamc',
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN,
    },
  );
};

const verifyAccessToken = token => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
