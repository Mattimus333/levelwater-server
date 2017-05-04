const knex = require('../../knex');

/**
* GET function to make request to Sources table. Returns JSON object with water_systems_id, source_name, source_type, treatment, critical_to_operations, year_constructed, capacity, condition, and continuous_chlorination.
* @module getSources
* @name getSources
* @route {GET} /sources
* @routeparam {Number} water_systems_id - serial ID for Water Systems table.
*/
const getSources = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) !== Number(result[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('sources')
    .where('water_systems_id', req.params.water_systems_id);
  })
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getSources;
