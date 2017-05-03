const knex = require('../../knex');

const postDistributionSystem = (req, res) => {
  const { water_systems_id, total_length_miles, average_age_of_pipes, condition, average_main_diameter_inches } = req.body;
  const distributionSystem = { water_systems_id, total_length_miles, average_age_of_pipes, condition, average_main_diameter_inches };

  const currentdate = new Date();
  if (typeof water_systems_id !== 'number') {
    return res.status(400).send('Water systems id must not be blank');
  }
  if (typeof total_length_miles !== 'number') {
    return res.status(400).send('Total length must not be blank');
  }
  if (typeof average_age_of_pipes !== 'number') {
    return res.status(400).send('Average age of pipes must be a number');
  }
  if (condition !== 'great' && condition !== 'fair' && condition !== 'poor') {
    return res.status(400).send('Condition must not be blank and must be great, fair or poor!');
  }
  if (average_main_diameter_inches !== '4' && average_main_diameter_inches !== '6' && average_main_diameter_inches !== '8' && average_main_diameter_inches !== '12' && average_main_diameter_inches !== '24') {
    return res.status(400).send('Average main diameter must be a valid length in inches');
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
    res.status(200).json(distributionSystem);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postDistributionSystem;
