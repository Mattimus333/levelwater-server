const knex = require('../../knex');

/**
* DELETE function to make request to Treatment table. Deletes and returns JSON object with water_systems_id, treatment_name, treatment_type, year_constructed, capacity, and condition, critical_to_operations
* @module deleteTreatment
* @name deleteTreatment
* @route {DELETE} /treatment
* @routeparam {Number} treatement_id - serial ID for Treatment table.
*/
const deleteTreatment = (req, res) => {
  let waterSystemId;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    waterSystemId = result[0].water_systems_id;
    return knex('treatment')
    .where('id', req.params.treatment_id)
    .select('water_systems_id');
  })
  .then((treatmentResult) => {
    if (Number(waterSystemId) !== Number(treatmentResult[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Treatment plant not found!' });
    }
    return knex('treatment')
    .where('id', req.params.treatment_id)
    .del();
  })
  .then((deletedRow) => {
    res.json(deletedRow);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = deleteTreatment;
