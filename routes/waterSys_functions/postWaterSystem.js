const knex = require('../../knex');

/**
* POST function to make request to Water Systems table. Posts and returns JSON object with pws_name, pws_id, population, and connections.
* @module postWaterSystem
* @name postWaterSystem
* @route {POST} /water-systems
*/
const postWaterSystems = (req, res) => {
  const { pws_name, pws_id, population, connections } = req.body;
  if (!pws_name || !pws_name.trim()) {
    return res.send({ status: 400, ErrorMessage: 'PWS name must not be blank' });
  }
  if (!pws_id) {
    return res.send({ status: 400, ErrorMessage: 'PWS id must not be blank' });
  }
  if (!population) {
    return res.send({ status: 400, ErrorMessage: 'Population must not be blank' });
  }
  if (!connections) {
    return res.send({ status: 400, ErrorMessage: 'Connections must not be blank' });
  }

  const waterSystem = { pws_name, pws_id, population, connections };

  knex('water_systems')
  .insert(waterSystem)
  .then((result) => {
    waterSystem.id = result[0];
    return knex('users')
    .where('id', req.claim.userId)
    .update('water_systems_id', result[0]);
  })
  .then(() => {
    return knex('users')
    .where('id', req.claim.userId)
    .update({
      profileStepCompleted: 'basic',
    });
  })
  .then(() => {
    res.status(200).json(waterSystem);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postWaterSystems;
