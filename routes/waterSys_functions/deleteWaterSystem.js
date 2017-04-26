const knex = require('../../knex');

const deleteWaterSystem = (req, res) => {
  let waterSystemsId;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.id) === Number(result[0].water_systems_id)) {
      console.log('here');
      return knex('water_systems')
      .where('id', req.params.id)
      .del();
    } else {
      throw new Error('Water System not found');
    }
  })
  .then((result) => {
    console.log('res', result);
    res.status(200).json(result);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
}

module.exports = deleteWaterSystem;
