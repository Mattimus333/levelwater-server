const knex = require('../../knex');

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
    res.status(200).json(waterSystem);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postWaterSystems;
