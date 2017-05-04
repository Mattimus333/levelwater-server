const knex = require('../../knex');

/**
* DELETE function to make request to Sources table. Deletes and returns JSON object with water_systems_id, source_name, source_type, treatment, critical_to_operations, year_constructed, capacity, condition, and continuous_chlorination.
* @module deleteSources
* @name deleteSources
* @route {DELETE} /sources
* @routeparam {Number} sources_id - serial ID for Sources table.
*/
const deleteSources = (req, res) => {
  let waterSystemId;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    waterSystemId = result[0].water_systems_id;
    return knex('sources')
    .where('id', req.params.source_id)
    .select('water_systems_id');
  })
  .then((sourceResult) => {
    if (Number(waterSystemId) !== Number(sourceResult[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Source not found!' });
    }
    return knex('sources')
    .where('id', req.params.source_id)
    .del();
  })
  .then((deletedRow) => {
    res.json(deletedRow);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = deleteSources;
