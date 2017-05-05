const knex = require('../../knex');

/**
* POST function to make request to Treatment table. Posts JSON object with water_systems_id, treatment_name, treatment_type, year_constructed, capacity, and condition, critical_to_operations
* @module postTreatment
* @name postTreatment
* @route {POST} /treatment
*/
const postTreatment = (req, res) => {
  const { water_systems_id, treatment_name, treatment_type, year_constructed, capacity, condition, critical_to_operations } = req.body;
  const treatment = { water_systems_id, treatment_name, treatment_type, year_constructed, capacity, condition, critical_to_operations };
  const currentdate = new Date();


  if (typeof water_systems_id !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Water systems id must not be blank' });
  }
  if (!treatment_name || !treatment_name.trim()) {
    return res.send({ status: 400, ErrorMessage: 'Treatment name must not be blank' });
  }
  if (treatment_type !== 'conventional-sw' && treatment_type !== 'ion-exchange' && treatment_type !== 'corrosion-control') {
    return res.send({ status: 400, ErrorMessage: 'Treatment type must not be blank and must be conventional-sw, ion-exchange, or corrosion-control' });
  }
  if (typeof year_constructed !== 'number' || (year_constructed > currentdate.getFullYear())) {
    return res.send({ status: 400, ErrorMessage: 'Year constructed must not be blank and must be a valid year' });
  }
  if (typeof capacity !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Capacity must not be blank' });
  }
  if (condition !== 'great' && condition !== 'fair' && condition !== 'poor') {
    return res.send({ status: 400, ErrorMessage: 'Condition must not be blank and must be great, fair, or poor' });
  }
  if (critical_to_operations !== 'true' && critical_to_operations !== 'false') {
    return res.send({ status: 400, ErrorMessage: 'Critical to operations must not be blank and must be true or false' });
  }

  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((user) => {
    if (Number(treatment.water_systems_id) !== user[0].water_systems_id) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('treatment')
    .insert(treatment);
  })
  .then((result) => {
    treatment.id = result[0];
    res.status(200).json(treatment);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postTreatment;
