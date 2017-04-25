const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, playload) => {
    if (err) {
      return res.send({ status: 401, errorMessage: 'Unauthorized' });
    }

    req.claim = playload;

    next();
  });
};

module.exports = authorize;
