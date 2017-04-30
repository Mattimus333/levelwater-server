const knex = require('../../knex');

const postTreatment = (req, res) => {
  const { water_systems_id, treatment_name, treatment_type, critical_to_operations, year_constructed, capacity, condition } = req.body;

  const treatment = { water_systems_id, treatment_name, treatment_type, critical_to_operations, year_constructed, capacity, condition };


  const currentdate = new Date();
  if (!treatment_name || !treatment_name.trim()) {
    return res.status(400).send('Treatment plant name must not be blank!');
  }
  if (treatment_type !== 'gw' && treatment_type !== 'sw') {
    return res.status(400).send('source type must not be blank and must be gw or sw');
  }
  if (critical_to_operations !== 'true' && critical_to_operations !== 'false') {
    return res.status(400).send('critical to operations must not be blank and must be true or false');
  }
  if (!year_constructed || (year_constructed > currentdate.getFullYear())) {
    return res.status(400).send('year constructed must not be blank must be a valid year');
  }
  if (!capacity) {
    return res.status(400).send('capacity must not be blank');
  }
  if (condition !== 'great' && condition !== 'fair' && condition !== 'poor') {
    return res.status(400).send('condition must not be blank and must be great, fair or poor');
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

module.export = postTreatment;
