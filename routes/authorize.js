const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send({ status: 401, ErrorMessage: 'Unauthorized' });
    }
    req.claim = payload;
    return next();
  });
};

module.exports = authorize;
