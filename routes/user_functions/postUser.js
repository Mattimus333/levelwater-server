const knex = require('../../knex');
const Joi = require('joi');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

/**
* POST function to make request to Users table. Posts JSON object with water_systems_id, first_name, last_name, email, hashed_password, and superuser.
* @module postsUser
* @name postsUser
* @route {POST} /users
*/
const postUsers = (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return res.send({ status: 400, errorMessage: 'Email must not be blank' });
  }
  if (!password || password.length < 8) {
    return res.send({ status: 400, errorMessage: 'Password must be at least 8 characters long' });
  }

  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      const valid = Joi.validate(email, Joi.string().email());
      if (user) {
        return res.send({ status: 400, ErrorMessage: 'Email already exists' });
      } else if (valid.error) {
        return res.send({ status: 400, ErrorMessage: 'Improper email format' });
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashed_password) => {
      const { first_name, last_name, superuser } = req.body;
      const newUser = {
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
      const claim = { userId: user };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days',
      });
      res.status(200).json({ user, token });
    })
    .catch((err) => {
      res.send({ status: 400, ErrorMessage: err });
    });
};


module.exports = postUsers;
