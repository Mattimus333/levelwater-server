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
  knex('users')
  .where('email', req.body.email)
  .select('hashed_password', 'first_name', 'last_name', 'id', 'email', 'superUser', 'water_systems_id')
  .then((users) => {
    user = users[0];
    console.log('here', user);
    if (user.length === 0) {
      throw new Error('no user found with this email!');
    } else {
      return bcrypt.compare(req.body.password, user.hashed_password);
    }
  })
  .then(() => {
    const claim = { userId: user.id };
    console.log('hereclaim', claim);
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '7 days',
    });

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),
      secure: router.get('env') === 'production',
    });
    delete user.hashed_password;
    return res.status(200).json(user);
  })
  .catch(bcrypt.MISMATCH_ERROR, () => {
    return res.send({ status: 400, ErrorMessage: 'Bad email or password' });
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = loginUsers;
