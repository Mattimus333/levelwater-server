const knex = require('../../knex');

const postWaterSystems = (req, res) => {
  const { pws_name, pws_id, population, connections } = req.body;
  if (!pws_name || !pws_name.trim()) {
    return res.status(400).send('Pws_name must not be blank');
  }
  if (!pws_id) {
    return res.status(400).send('Pws_id must not be blank');
  }
  if (!population) {
    return res.status(400).send('Population must not be blank');
  }
  if (!connections) {
    return res.status(400).send('Connections must not be blank');
  }

  const waterSystem = { pws_name, pws_id, population, connections };
  let waterSystemId;

  knex('water_systems')
  .insert(waterSystem)
  .then((result) => {
    waterSystemId = result[0];
    return knex('users')
    .where('id', req.claim.userId)
    .update('water_systems_id', result[0]);
  })
  .then(() => {
    res.status(200).json(waterSystemId);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postWaterSystems;
