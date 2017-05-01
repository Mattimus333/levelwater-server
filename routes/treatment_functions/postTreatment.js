const knex = require('../../knex');

const postTreatment = (req, res) => {
  const { water_systems_id, treatment_name, treatment_type, critical_to_operations, year_constructed, capacity, condition } = req.body;

  const treatment = { water_systems_id, treatment_name, treatment_type, critical_to_operations, year_constructed, capacity, condition };


  const currentdate = new Date();
  if (!treatment_name || !treatment_name.trim()) {
    return res.status(400).send('Treatment plant name must not be blank!');
  }
  if (treatment_type !== 'conventional-sw' && treatment_type !== 'ion-exchange' && treatment_type !== 'corrosion-control') {
    return res.status(400).send('Treatment type must not be blank and must be conventional-sw, ion-exchange, or corrosion-control');
  }
  if (!year_constructed || (year_constructed > currentdate.getFullYear())) {
    return res.status(400).send('Year constructed must not be blank must be a valid year');
  }
  if (typeof capacity !== 'number') {
    return res.status(400).send('Capacity must not be blank');
  }
  if (condition !== 'great' && condition !== 'fair' && condition !== 'poor') {
    return res.status(400).send('Condition must not be blank and must be great, fair or poor');
  }

  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(treatment.water_systems_id) !== result[0].water_systems_id) {
      return res.send({ status: 400, ErrorMessage: 'water system not found!' });
    } // else?
    return knex('treatment')
    .insert(treatment);
  })
  .then((result) => {
    treatment.id = result[0];
    res.status(200).json(treatment);
  })
  .catch(err => res.send({ status: 400, ErrorMessage: err }));
};

module.exports = postTreatment;
