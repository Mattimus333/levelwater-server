const knex = require('../../knex');

const getSources = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) === Number(result[0].water_systems_id)) {
      return knex('sources')
      .where('water_systems_id', req.params.water_systems_id);
    } else {
      return res.send({ status: 400, ErrorMessage: 'water system not found!' });
    }
  })
  .then((results) => {
    return res.json(results);
  })
};

module.exports = getSources;
