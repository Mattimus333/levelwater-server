'use strict';

const express = require('express');

const router = express.Router();

const test = require('./users');
const usersSignup = require('./users_signup');
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

router.get('/test', test);
router.post('/signup/step0', usersSignup);
router.get('/signup/step0', authorize, usersSignup);
router.put('/signup/step0', authorize, usersSignup);
router.delete('/signup/step0', authorize, usersSignup);
// router.get('/water_systems', )

module.exports = router;
