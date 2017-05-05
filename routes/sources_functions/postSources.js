const knex = require('../../knex');

/**
* POST function to make request to Sources table. Posts JSON object with water_systems_id, source_name, source_type, treatment, critical_to_operations, year_constructed, capacity, condition, and continuous_chlorination.
* @module postSources
* @name postSources
* @route {POST} /sources
*/
const postSources = (req, res) => {
  const { water_systems_id, source_name, source_type, treatment, critical_to_operations, year_constructed, capacity, condition, continuous_chlorination } = req.body;
  const source = { water_systems_id, source_name, source_type, treatment, critical_to_operations, year_constructed, capacity, condition, continuous_chlorination };

  const currentdate = new Date();
  if (typeof water_systems_id !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Water systems id must not be blank' });
  }
  if (!source_name || !source_name.trim()) {
    return res.send({ status: 400, ErrorMessage: 'Source name must not be blank' });
  }
  if (source_type !== 'gw' && source_type !== 'sw') {
    return res.send({ status: 400, ErrorMessage: 'Source type must not be blank' });
  }
  if (treatment !== 'true' && treatment !== 'false') {
    return res.send({ status: 400, ErrorMessage: `Treatment must not be blank and must be blank and must be 'true' or 'false'` });
  }
  if (critical_to_operations !== 'true' && critical_to_operations !== 'false') {
    return res.send({ status: 400, ErrorMessage: `Critical to operations must not be blank and must be 'true' or 'false'` });
  }
  if (typeof year_constructed !== 'number' || (year_constructed > currentdate.getFullYear())) {
    return res.send({ status: 400, ErrorMessage: 'Year constructed must not be blank and must be a valid year' });
  }
  if (typeof capacity !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Capacity must not be blank' });
  }
  if (condition !== 'great' && condition !== 'fair' && condition !== 'poor') {
    return res.send({ status: 400, ErrorMessage: `Condition must not be blank and must be 'great', 'fair', or 'poor'` });
  }
  if (continuous_chlorination !== 'true' && continuous_chlorination !== 'false') {
    return res.send({ status: 400, ErrorMessage: `Continuous chlorination name must not be blank and must be 'true' or 'false'` });
  }
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(source.water_systems_id) !== result[0].water_systems_id || result.length === 0 ) {
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
    res.send({ status: 400, ErrorMessage: 'this' });
  });
};

module.exports = postSources;
