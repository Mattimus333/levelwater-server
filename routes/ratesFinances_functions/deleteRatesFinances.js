const knex = require('../../knex');

/**
*@module deleteRatesFinances
* DELETE function to make request to Rates Finances table
* @name deleteRatesFinances
* @route {DELETE} /rates-finances-fixedcosts
* @routeparam {Number} rates_finances_id - The id for the water system. Returns JSON object with water_systems_id, total_length_miles, average_age_of_pipes, and average_main_diameter_inches.
*/const deleteRatesFinances = (req, res) => {
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
