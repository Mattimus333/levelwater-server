const knex = require('../../knex');

const getUser = (req, res) => {
  if (typeof req.params.userId !== 'number' || req.params.userId === undefined) {
    return res.status(400).set('Content-Type', 'text/plain').send('User ID must be an integer');
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
