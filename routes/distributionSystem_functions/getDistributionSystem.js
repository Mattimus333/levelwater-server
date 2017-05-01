const knex = require('../../knex');

const getDistributionSystem = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) !== Number(result[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('distribution_system')
    .where('water_systems_id', req.params.water_systems_id);
  })
  .then((results) => {
    res.json(results[0]);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getDistributionSystem;
