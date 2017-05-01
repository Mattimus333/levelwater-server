const knex = require('../../knex');

const deleteRatesFinances = (req, res) => {
  let waterSystemId;
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    waterSystemId = result[0].water_systems_id;
    return knex('rates_finances_fixedcosts')
    .where('id', req.params.ratesFinancesId)
    .select('water_systems_id');
  })
  .then((ratesResult) => {
    if (Number(waterSystemId) !== Number(ratesResult[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Rates/Finances not found!' });
    }
    return knex('rates_finances_fixedcosts')
    .where('id', req.params.ratesFinancesId)
    .del();
  })
  .then((deletedRow) => {
    res.json(deletedRow);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = deleteRatesFinances;
