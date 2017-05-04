const knex = require('../../knex');

/**
* GET function to make request to Users table. Returns JSON object with water_systems_id, first_name, last_name, email, hashed_password, and superuser.
* @module getUser
* @name getUser
* @route {GET} /users
* @routeparam {Number} user_id - serial ID for Users table.
*/
const getUser = (req, res) => {

  if (Number(req.claim.userId) !== Number(req.params.user_id)) {
    return res.send({ status:401, ErrorMessage: 'Unauthorized' });
  }
  return knex('users')
  .where('id', req.params.user_id)
  .first()
  .then((user) => {
    delete user.hashed_password;
    res.status(200).json(user);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getUser;
