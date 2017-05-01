const knex = require('../../knex');

const postDistributionSystem = (req, res) => {
  const { water_systems_id, total_length, number_of_valves, number_of_meters, number_of_pumping_plants, combined_pumping_capacity, pumps_condition } = req.body;
  const distributionSystem = { water_systems_id, total_length, number_of_valves, number_of_meters, number_of_pumping_plants, combined_pumping_capacity, pumps_condition };

  const currentdate = new Date();
  if (typeof water_systems_id !== 'number') {
    return res.status(400).send('Water systems id must not be blank');
  }
  if (typeof total_length !== 'number') {
    return res.status(400).send('Total length must not be blank');
  }
  if (typeof number_of_valves !== 'number') {
    return res.status(400).send('Number of valves must not be blank');
  }
  if (typeof number_of_meters !== 'number') {
    return res.status(400).send('Number of meters must not be blank');
  }
  if (typeof number_of_pumping_plants !== 'number') {
    return res.status(400).send('Number of pumping plants must not be blank');
  }
  if (typeof combined_pumping_capacity !== 'number') {
    return res.status(400).send('Combined pumping capacity must not be blank');
  }
  if (pumps_condition !== 'great' && pumps_condition !== 'fair' && pumps_condition !== 'poor') {
    return res.status(400).send('Pumps condition must not be blank and must be great, fair or poor');
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
