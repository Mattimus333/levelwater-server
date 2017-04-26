const knex = require('../../knex');

const deleteUser = (req, res) => {
  if (Number(req.claim.userId) !== Number(req.params.userId)) {
    return res.status(404).send('This user could not be found');
  }
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
};

module.exports = deleteUser;
