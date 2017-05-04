const knex = require('../../knex');

/**
  * PATCH function to make request to Rates Finances table. Patches and returns JSON object with water_systems_id, current_average_water_rate, total_financial_reserves, annual_revenue_water_sales, annual_revenue_fees_charged, annual_revenue_subsidies, annual_savings_to_financial_reserves, annual_personnel_costs, annual_operations_costs, and annual_debt_costs.
* @module patchRatesFinances
* @name patchRatesFinances
  * @route {PATCH} /rates-finances-fixedcosts
* @routeparam {Number} rates_finances_id - serial ID for Rates Finances Fixed-costs table.
*/
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
      return res.send({ status: 400, ErrorMessage: 'Rates/Finances not found!' });
    }
    return knex('rates_finances_fixedcosts')
    .where('id', req.params.rates_finances_id)
    .update(req.body);
  })
  .then(() => {
    res.json(req.body);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = patchRatesFinances;
