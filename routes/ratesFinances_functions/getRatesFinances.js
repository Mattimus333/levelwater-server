const knex = require('../../knex');

/**
* GET function to make request to Rates Finances table. Returns JSON object with water_systems_id, current_average_water_rate, total_financial_reserves, annual_revenue_water_sales, annual_revenue_fees_charged, annual_revenue_subsidies, annual_savings_to_financial_reserves, annual_personnel_costs, annual_operations_costs, and annual_debt_costs.
*@module getRatesFinances
* @name getRatesFinances
* @route {GET} /rates-finances-fixedcosts
* @routeparam {Number} water_systems_id - ID for Water Systems table.
*/
const getRatesFinances = (req, res) => {
  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(req.params.water_systems_id) !== Number(result[0].water_systems_id)) {
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('rates_finances_fixedcosts')
    .where('water_systems_id', req.params.water_systems_id);
  })
  .then((results) => {
    res.json(results);
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
};

module.exports = getRatesFinances;
