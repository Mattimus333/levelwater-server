const knex = require('../../knex');

/**
* GET function to make request to return JSON object from Algorithm Results table
* @module getAlgorithm
* @name getAlgorithm
* @route {GET} /algorithm-results
* @routeparam {Number} water_systems_id - The id for the water system.
*/
const getAlgorithm = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) !== Number(result[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('algorithm_results')
    .where('water_systems_id', req.params.water_systems_id);
  })
  .then((results) => {
    res.json(results[0]);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getAlgorithm;
