'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const jwt = require('jsonwebtoken');

function usersSignup(req, res) {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return res.send(400, 'Email must not be blank');
  }

  if (!password || password.length < 8) {
    return next(boom.create(
      400,
      'Password must be at least 8 characters long'
    ));
  }

}

module.exports = {
  usersSignup: usersSignup
};
