const knex = require('../../knex');

/**
* GET function to make request to Storage Reservoir table. Returns JSON object with water_systems_id, reservoir_type, reservoir_name, year_constructed, capacity, condition, and critical_to_operations.
* @module getStorageReservoirs
* @name getStorageReservoirs
* @route {GET} /storage-reservoirs
* @routeparam {Number} water_systems_id - serial ID for Water Systems table.
*/
const getStorageReservoirs = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) !== Number(result[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('storage_reservoirs')
    .where('water_systems_id', req.params.water_systems_id);
  })
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getStorageReservoirs;
