const knex = require('../../knex');

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
    return res.json(req.body);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = patchStorageReservoirs;
