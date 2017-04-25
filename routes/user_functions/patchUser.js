const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[env];
const knex = require('knex')(config);
const bcrypt = require('bcrypt-as-promised');

//must return undefined if we do not want that field to update?
const patchUser = (req, res) => {
  if (isNaN(req.params.userId) || req.params.userId === undefined) {
    res.status(400).send('User ID must be an integer');
  } else {
    const user = {
      water_systems_id: req.body.water_systems_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      superuser: req.body.superuser,
    };
    return knex('users')
    .where('id', req.params.userId)
    .update(user)
    .then(() => {
      user.id = req.params.userId;
      res.status(200).json(user);
    })
    .catch((err) => {
      res.send({ status: 400, ErrorMessage: err });
    });
  }
};

module.exports = patchUser;
