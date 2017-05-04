const knex = require('../../knex');

/**
* DELETE function to make request to Water Systems table. Deletes and returns JSON object with pws_name, pws_id, population, and connections.
* @module deleteWaterSystem
* @name deleteWaterSystem
* @route {DELETE} /water-systems
* @routeparam {Number} water_systems_id - serial ID for Water Systems table.
*/
const deleteWaterSystem = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) === Number(result[0].water_systems_id)) {
      return knex('water_systems')
      .del()
      .where('id', (req.params.water_systems_id));
    }
    return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
  })
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = deleteWaterSystem;
