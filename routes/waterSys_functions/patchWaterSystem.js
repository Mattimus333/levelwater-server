const knex = require('../../knex');

const patchWaterSystem = (req, res) => {
  let waterSystem;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) !== Number(result[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'water system not found!' });
    }
    waterSystem = {
      pws_name: req.body.pws_name,
      pws_id: req.body.pws_id,
      population: req.body.population,
      connections: req.body.connections,
    };
    return knex('water_systems')
    .where('id', req.params.water_systems_id)
    .update(waterSystem);
  })
  .then((result) => {
    console.log(result);
    res.status(200).json(waterSystem);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};


module.exports = patchWaterSystem;
