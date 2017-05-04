const knex = require('../../knex');

/**
* GET function to make request to Treatment table. Returns JSON object with water_systems_id, treatment_name, treatment_type, year_constructed, capacity, and condition, critical_to_operations
* @module getTreatment
* @name getTreatment
* @route {GET} /treatment
* @routeparam {Number} water_systems_id - serial ID for Water Systems table.
*/
const getTreatment = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) !== Number(result[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('treatment')
    .where('water_systems_id', req.params.water_systems_id);
  })
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getTreatment;
