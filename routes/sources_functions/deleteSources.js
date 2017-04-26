const knex = require('../../knex');

const deleteSources = (req, res) => {
  let waterSystemId;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    waterSystemId = result[0].water_systems_id; //references claimed user
    return knex('sources')
    .where('id', req.params.source_id)
    .select('water_systems_id')
  })
  .then((sourceResult) => {
    if (waterSystemId === sourceResult[0].water_systems_id) {
      return knex('sources')
      .where('id', req.params.source_id)
      .del()
    }
  })
  .then((deletedRow) => {
    return res.json(deletedRow);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = deleteSources;
