const knex = require('../../knex');

/**
* DELETE function to make request to Users table. Deletes and returns JSON object with water_systems_id, first_name, last_name, email, hashed_password, and superuser.
* @module deleteUser
* @name deleteUser
* @route {DELETE} /users
* @routeparam {Number} user_id - serial ID for Users table.
*/
const deleteUser = (req, res) => {
  if (Number(req.claim.userId) !== Number(req.params.user_id)) {
    return res.send({ status: 404, ErrorMessage: 'This user could not be found' });
  }
  return knex('users')
  .where('id', req.params.user_id)
  .del()
  .then((user) => {
    delete user.hashed_password;
    res.status(200).json(user);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = deleteUser;
