const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[env];
const knex = require('knex')(config);

const deleteUser = (req, res) => {
  if (isNaN(req.params.userId) || req.params.userId === undefined) {
    res.status(400).set('Content-Type', 'text/plain').send('User ID must be an integer');
  } else {
    knex('users')
    .where('id', req.params.userId)
    .del()
    .then((user) => {
      delete user.hashed_password;
      res.status(200).json(user);
    })
    .catch((err) => {
      res.send({ status: 400, ErrorMessage: err });
    });
  }
};

module.exports = deleteUser;
