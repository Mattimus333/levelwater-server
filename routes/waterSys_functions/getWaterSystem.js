const knex = require('../../knex');

const getWaterSystem = (req, res) => {
  console.log(req.claim.userId);
  if (Number.isNaN(req.params.waterSystemId)) {
    return res.send({ status: 400, ErrorMessage: 'Must have a valid water system id!' });
  }
  knex('water_systems')
  .where('id', req.params.waterSystemId)
  .then((result) => {
    if (result.length === 0) {
      return res.send({ status: 400, ErrorMessage: 'Must have a valid water system id!' });
    }
    return res.json(result[0]);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
}

module.exports = getWaterSystem;
