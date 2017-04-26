const knex = require('../../knex');

const getWaterSystem = (req, res) => {
  if (req.claim.userId !== req.params.userId) {
    return res.status(404).send('This user could not be found');
  }
  knex('water_systems')
  .where('id', req.params.id)
  .then((result) => {
    if (result.length === 0) {
      return res.send({ status: 400, ErrorMessage: 'Must have a valid water system id!' });
    }
    return res.json(result[0]);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getWaterSystem;
