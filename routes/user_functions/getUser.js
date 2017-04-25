const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[env];
const knex = require('knex')(config);

const getUser = (req, res) => {
  if (isNaN(req.params.userId) || req.params.userId === undefined) {
    res.status(400).set('Content-Type', 'text/plain').send('User ID must be an integer');
  } else {
    knex('users')
    .where('id', req.params.userId)
    .first()
    .then((user) => {
      delete user.hashed_password;
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send('user ID is invalid!');
    });
  }
};

module.exports = getUser;
