const knex = require('../../knex');

const deleteWaterSystem = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) === Number(result[0].water_systems_id)) {
      return knex('water_systems')
      .del()
      .where('id', (req.params.water_systems_id));
    } else {
      // throw new Error('Water System not found');
      return res.send({ status: 400, ErrorMessage: 'water system not found!' });
    }
  })
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
}

module.exports = deleteWaterSystem;
