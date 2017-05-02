const knex = require('../../knex');

const postDashboard = (req, res) => {
  const {
    water_systems_id,
  } = req.body;

  const dashboard = {
    water_systems_id,
  };

  if (typeof water_systems_id !== 'number') {
    return res.status(400).send('Water systems id must not be blank');
  }

  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(dashboard.water_systems_id) !== result[0].water_systems_id) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('sources')
    .where('water_systems_id', req.body.water_systems_id);
  })
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.export = postDashboard;
