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

  knex('water_systems')
  .insert(waterSystem)
  .then((result) => {
    res.status(200).json(result[0]);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = postWaterSystems;
