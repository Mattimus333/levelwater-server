const knex = require('../../knex');

const patchRatesFinances = (req, res) => {
  let waterSystemId;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    waterSystemId = result[0].water_systems_id;
    return knex('rates_finances_fixedcosts')
    .where('id', req.params.rates_finances_id)
    .select('water_systems_id');
  })
  .then((ratesResult) => {
    if (Number(waterSystemId) !== Number(ratesResult[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'RatesFinances not found!' });
    }
    return knex('rates_finances_fixedcosts')
    .where('id', req.params.rates_finances_id)
    .update(req.body);
  })
  .then(() => {
    return res.json(req.body);
  })
  .catch((err) => {
    return res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = patchRatesFinances;
