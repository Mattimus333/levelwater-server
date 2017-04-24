const express = require('express');
const test = require('./users');
const postUsers = require('./users_signup');
const patchUsers = require('./users_signup');
const deleteUsers = require('./users_signup');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authorize = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, playload) => {
    if (err) {
      return res.send({ status: 401, errorMessage: 'Unauthorized' });
    }

    req.claim = playload;

    next();
  });
};

router.get('/test', authorize, test);

// routes for users table
router.post('/users/', postUsers);
router.patch('/users/', authorize, patchUsers);
router.delete('/users/', authorize, deleteUsers);

// routes for water_systems table
// router.get('/water_systems', authorize, function)

module.exports = router;
