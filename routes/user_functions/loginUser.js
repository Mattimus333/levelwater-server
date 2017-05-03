const express = require('express');
const knex = require('../../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

const router = express.Router();

const loginUsers = (req, res) => {
  let user;
  if (req.body.email === undefined) {
    return res.send({ status: 400, errorMessage: 'Email must not be blank' });
  }
  if (req.body.password === undefined) {
    return res.send({ status: 400, errorMessage: 'Password must not be blank' });
  }
  return knex('users')
  .where('email', req.body.email)
  .select('hashed_password', 'first_name', 'last_name', 'id', 'email', 'superUser', 'water_systems_id')
  .then((users) => {
    user = users[0];
    if (user.length === 0) {
      return res.send({ status: 400, ErrorMessage: 'Bad email or password' });
    }
    return bcrypt.compare(req.body.password, user.hashed_password);
  })
  .then(() => {
    const claim = { userId: user.id };
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '7 days',
    });
    delete user.hashed_password;
    user.token = token;
    // console.log('USER', user);

    res.status(200).json({ user });
  })
  .catch(bcrypt.MISMATCH_ERROR, () => {
    res.send({ status: 400, ErrorMessage: 'Bad email or password' });
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = loginUsers;
