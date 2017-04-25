<<<<<<< HEAD:routes/users_signup.js
'use strict';

const express = require('express');

const router = express.Router();
const knex = require('../knex');
=======
const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[env];
const knex = require('knex')(config);
const express = require('express');

const router = express.Router();
>>>>>>> userRoutes:routes/user_functions/postUser.js
const Joi = require('joi');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

<<<<<<< HEAD:routes/users_signup.js
const getUsers = (req, res) => {
  const { id } = req.body;
  knex('users')
  .where('id', id)
}

const postUsers = (req, res) => {
  console.log('req.body', req.body);
=======
const postUsers = (req, res) => {
>>>>>>> userRoutes:routes/user_functions/postUser.js
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    console.log('email', email);
    return res.send({ status: 400, errorMessage: 'Email must not be blank' });
  }

  if (!password || password.length < 8) {
    return res.send({ status: 400, errorMessage: 'Password must be at least 8 characters long' });
  }

  knex('users')
    // .where('water_systems_id', null)
    .where('email', email)
    .first()
    .then((user) => {
      const valid = Joi.validate(email, Joi.string().email());
      if (user) {
        res.send({ status: 400, ErrorMessage: 'Email already exists' });
      } else if (valid.error) {
        res.send({ status: 400, ErrorMessage: 'Improper email format' });
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashed_password) => {
      const { water_systems_id, first_name, last_name, superuser } = req.body;
      const newUser = {
        water_systems_id,
        first_name,
        last_name,
        email,
        hashed_password,
        superuser,
      };

      return knex('users').insert(newUser, '*');
    })
    .then((users) => {
      const user = users[0];
      const claim = { userId: user.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days',
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),  // 7 days
        secure: router.get('env') === 'production',
      });

      delete user.hashed_password;
<<<<<<< HEAD:routes/users_signup.js

      res.send(user);
=======
      console.log(user);
      res.status(200).json(user);
>>>>>>> userRoutes:routes/user_functions/postUser.js
    })
    .catch((err) => {
      res.send({ status: 400, ErrorMessage: err });
    });
}

<<<<<<< HEAD:routes/users_signup.js
module.exports = {
  getUsers,
  postUsers,
  patchusers,
  deleteUsers
}
=======
module.exports = postUsers;
>>>>>>> userRoutes:routes/user_functions/postUser.js
