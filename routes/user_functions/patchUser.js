const knex = require('../../knex');

const patchUser = (req, res) => {
  if (Number(req.claim.userId) !== Number(req.params.userId)) {
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
  .where('id', req.params.userId)
  .update(user)
  .then(() => {
    user.id = req.params.userId;
    res.status(200).json(user);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = patchUser;
