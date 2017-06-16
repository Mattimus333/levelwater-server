const knex = require('../../knex');

/**
* POST function to make request to Storage Reservoir table. Posts JSON object with water_systems_id, reservoir_type, reservoir_name, year_constructed, capacity, condition, and critical_to_operations.
* @module postStorageReservoirs
* @name postStorageReservoirs
* @route {POST} /storage-reservoirs
*/
const postStorageReservoirs = (req, res) => {
  const { water_systems_id, reservoir_type, reservoir_name, year_constructed, capacity, condition, critical_to_operations } = req.body
  const reservoir = { water_systems_id, reservoir_type, reservoir_name, year_constructed, capacity, condition, critical_to_operations };

  const currentdate = new Date();
  if (typeof water_systems_id !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Water systems id must not be blank' });
  }
  if (!reservoir_name || !reservoir_name.trim()) {
    return res.send({ status: 400, ErrorMessage: 'Reservoir name must not be blank' });
  }
  if (reservoir_type !== 'concrete' && reservoir_type !== 'steel' && reservoir_type !==  'redwood' && reservoir_type !==  'plastic') {
    return res.send({ status: 400, ErrorMessage: 'Reservoir type must be valid' });
  }
  if (typeof year_constructed !== 'number' || (year_constructed > currentdate.getFullYear())) {
    return res.send({ status: 400, ErrorMessage: 'Year constructed must not be blank and must be a valid year' });
  }
  if (typeof capacity !== 'number' || capacity < 0) {
    return res.send({ status: 400, ErrorMessage: 'Capacity must not be blank and must not be negative' });
  }
  if (condition !== 'great' && condition !== 'fair' && condition !== 'poor') {
    return res.send({ status: 400, ErrorMessage: 'Condition must not be blank and must be great, fair, or poor' });
  }
  if (critical_to_operations !== 'true' && critical_to_operations !== 'false') {
    return res.send({ status: 400, ErrorMessage: 'Critical to Operations status must be either true or false' });
  }

  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(reservoir.water_systems_id) !== result[0].water_systems_id) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('storage_reservoirs')
    .insert(reservoir);
  })
  .then(() => {
    return knex('users')
    .where('id', req.claim.userId)
    .update({
      profileStepCompleted: 'storage',
    })
  })
  .then((result) => {
    reservoir.id = result[0];
    res.status(200).json(reservoir);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postStorageReservoirs;
