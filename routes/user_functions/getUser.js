const knex = require('../../knex');

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
