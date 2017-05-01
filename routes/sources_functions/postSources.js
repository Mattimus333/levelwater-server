const knex = require('../../knex');

const postSources = (req, res) => {
  const { water_systems_id, source_name, source_type, treatment, critical_to_operations, year_constructed, capacity, condition, continuous_chlorination } = req.body;
  const source = { water_systems_id, source_name, source_type, treatment, critical_to_operations, year_constructed, capacity, condition, continuous_chlorination };

  const currentdate = new Date();
  if (typeof water_systems_id !== 'number') {
    return res.status(400).send('Water systems id must not be blank and must be a number!');
  }
  if (!source_name || !source_name.trim()) {
    return res.status(400).send('Source name must not be blank!');
  }
  if (source_type !== 'gw' && source_type !== 'sw') {
    return res.status(400).send('Source type must not be blank and must be gw or sw!');
  }
  if (treatment !== 'true' && treatment !== 'false') {
    return res.status(400).send('Treatment must not be blank and must be true or false!');
  }
  if (critical_to_operations !== 'true' && critical_to_operations !== 'false') {
    return res.status(400).send('Critical to operations must not be blank and must be true or false!');
  }
  if (typeof year_constructed !== 'number' || (year_constructed > currentdate.getFullYear())) {
    return res.status(400).send('Year constructed must not be blank must be a valid year');
  }
  if (typeof capacity !== 'number') {
    return res.status(400).send('Capacity must not be blank!');
  }
  if (condition !== 'great' && condition !== 'fair' && condition !== 'poor') {
    return res.status(400).send('Condition must not be blank and must be great, fair or poor!');
  }
  if (continuous_chlorination !== 'true' && continuous_chlorination !== 'false') {
    return res.status(400).send('Continuous chlorination must not be blank and must be true or false!');
  }
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(source.water_systems_id) !== result[0].water_systems_id) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('sources')
    .insert(source);
  })
  .then((result) => {
    source.id = result[0];
    res.status(200).json(source);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postSources;
