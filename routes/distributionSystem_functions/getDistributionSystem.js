const knex = require('../../knex');

/**
*@module getDistributionSystem
* GET function to make request to Distribution Systems table
* @name getDistributionSystem
* @route {GET} /distribution-system
* @routeparam {Number} water_systems_id - The id for the water system. Returns JSON object with water_systems_id, total_length_miles, average_age_of_pipes, and average_main_diameter_inches.
*/
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
