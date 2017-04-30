const knex = require('../../knex');

const patchTreatment = (req, res) => {
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
    .update(req.body);
  })
  .then(() => res.json(req.body))
  .catch(err => res.send({ status: 400, ErrorMessage: err }));
};

module.exports = patchTreatment;
