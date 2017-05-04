const knex = require('../../knex');

/**
* PUT function to make request to Users table. Puts and returns JSON object with water_systems_id, first_name, last_name, email, hashed_password, and superuser.
* @module putUser
* @name putUser
* @route {PUT} /users
* @routeparam {Number} user_id - serial ID for Users table.
*/
const putUser = (req, res) => {
  if (Number(req.claim.userId) !== Number(req.params.user_id)) {
    return res.status(404).send('This user could not be found');
  }
  const user = {
    water_systems_id: req.body.water_systems_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    superuser: req.body.superuser,
  };
  return knex('users')
  .where('id', req.params.user_id)
  .update(user)
  .then(() => {
    user.id = req.params.user_id;
    res.status(200).json(user);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = putUser;
