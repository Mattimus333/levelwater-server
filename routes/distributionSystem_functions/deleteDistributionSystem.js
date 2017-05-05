const knex = require('../../knex');

/**
* DELETE function to make request to Distribution Systems table. Returns JSON object with water_systems_id, total_length_miles, average_age_of_pipes, condition, distribution_name, and average_main_diameter_inches.
* @module deleteDistributionSystem
* @name deleteDistributionSystem
* @route {DELETE} /distribution-system
* @routeparam {Number} water_systems_id - The id for the water system.
*/
const deleteDistributionSystem = (req, res) => {
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
    .del();
  })
  .then((deletedRow) => {
    res.json(deletedRow);
  })
  .catch((err) => {
    if (Object.keys(err).length === 0) { err = 'Distribution system not found!'; }
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = deleteDistributionSystem;
