const knex = require('../../knex');

/**
* GET function to make request to Water Systems table. Returns JSON object with pws_name, pws_id, population, and connections.
* @module getWaterSystem
* @name getWaterSystem
* @route {GET} /water-systems
* @routeparam {Number} water_systems_id - serial ID for Water Systems table.
*/
const getWaterSystem = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) === Number(result[0].water_systems_id)) {
      return knex('water_systems')
      .where('id', req.params.water_systems_id);
    }
    return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
  })
  .then((result) => {
    res.json(result[0]);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getWaterSystem;
