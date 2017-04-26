const knex = require('../../knex');

const getUser = (req, res) => {
  if (Number(req.claim.userId) !== Number(req.params.userId)) {
    return res.status(404).send('This user could not be found');
  }
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
};

module.exports = getUser;
