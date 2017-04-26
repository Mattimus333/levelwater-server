const knex = require('../../knex');

const getWaterSystem = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) === Number(result[0].water_systems_id)) {
      return knex('water_systems')
      .where('id', req.params.water_systems_id);
    } else {
      return res.send({ status: 400, ErrorMessage: 'water system not found!' });
    }
  })
  .then((result) => {
    return res.json(result[0]);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getWaterSystem;
