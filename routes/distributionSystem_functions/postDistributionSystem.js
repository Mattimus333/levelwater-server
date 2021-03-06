const knex = require('../../knex');
/* eslint max-len: "off", camelcase: "off"*/

/**
* POST function to make request to Distribution Systems table. Posts and returns JSON object with water_systems_id, total_length_miles, average_age_of_pipes, condition, distribution_name, and average_main_diameter_inches.
* @module postDistributionSystem
* @name postDistributionSystem
* @route {POST} /distribution-system
*/
const postDistributionSystem = (req, res) => {
  const { water_systems_id, total_length_miles, average_age_of_pipes, average_main_diameter_inches, condition } = req.body;
  const distributionSystem = { water_systems_id, total_length_miles, average_age_of_pipes, condition, average_main_diameter_inches };

  if (typeof water_systems_id !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Water systems id must not be blank' });
  }
  if (typeof total_length_miles !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Total length must not be blank and must be a number' });
  }
  if (typeof average_age_of_pipes !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Average age of pipes must not be blank and must be a number' });
  }
  if (condition !== 'great' && condition !== 'fair' && condition !== 'poor') {
    return res.send({ status: 400, ErrorMessage: 'Condition must not be blank and must be "great", "fair", or "poor"' });
  }
  if (average_main_diameter_inches !== '4' && average_main_diameter_inches !== '6' && average_main_diameter_inches !== '8' && average_main_diameter_inches !== '12' && average_main_diameter_inches !== '24') {
    return res.send({ status: 400, ErrorMessage: 'Average main diameter must be a valid length in inches' });
  }

  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(distributionSystem.water_systems_id) !== result[0].water_systems_id) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('distribution_system')
    .insert(distributionSystem);
  })
  .then((result) => {
    distributionSystem.id = result[0];
    return knex('users')
    .where('id', req.claim.userId)
    .update({
      profileStepCompleted: 'distribution',
    });
  })
  .then(() => {
    res.status(200).json(distributionSystem);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postDistributionSystem;
