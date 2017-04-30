const knex = require('../../knex');

const patchSources = (req, res) => {
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
    .update(req.body);
  })
  .then(() => res.json(req.body))
  .catch(err => res.send({ status: 400, ErrorMessage: err }));
};

module.exports = patchSources;
