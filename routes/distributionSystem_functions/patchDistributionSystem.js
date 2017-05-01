const knex = require('../../knex');

const patchDistributionSystem = (req, res) => {
  let waterSystemId;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    waterSystemId = result[0].water_systems_id;
    return knex('distribution_system')
    .where('id', req.params.distribution_system_id)
    .select('water_systems_id');
  })
  .then((distributionSystemResult) => {
    if (Number(waterSystemId) !== Number(distributionSystemResult[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Distribution system not found!' });
    }
    return knex('distribution_system')
    .where('id', req.params.distribution_system_id)
    .update(req.body);
  })
  .then(() => {
    res.json(req.body);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = patchDistributionSystem;
