const knex = require('../../knex');

/**
* PATCH function to make request to Storage Reservoir table. Patches and returns JSON object with water_systems_id, reservoir_type, reservoir_name, year_constructed, capacity, condition, and critical_to_operations.
* @module patchStorageReservoirs
* @name patchStorageReservoirs
* @route {PATCH} /storage-reservoirs
* @routeparam {Number} storage_reservoir_id - serial ID for Storage Reservoir table.
*/
const patchStorageReservoirs = (req, res) => {
  let waterSystemId;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    waterSystemId = result[0].water_systems_id;
    return knex('storage_resevoirs')
    .where('id', req.params.storage_reservoir_id)
    .select('water_systems_id');
  })
  .then((reservoirResult) => {
    if (Number(waterSystemId) !== Number(reservoirResult[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Reservoir not found!' });
    }
    return knex('storage_resevoirs')
    .where('id', req.params.storage_reservoir_id)
    .update(req.body);
  })
  .then(() => {
    res.json(req.body);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = patchStorageReservoirs;
