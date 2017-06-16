const knex = require('../../knex');

/**
* POST function to make request to Rates Finances table. Posts and returns JSON object with water_systems_id, current_average_water_rate, total_financial_reserves, annual_revenue_water_sales, annual_revenue_fees_charged, annual_revenue_subsidies, annual_savings_to_financial_reserves, annual_personnel_costs, annual_operations_costs, and annual_debt_costs.
* @module postRatesFinances
* @name postRatesFinances
* @route {POST} /rates-finances-fixedcosts
*/
const postRatesFinances = (req, res) => {
  const {
    water_systems_id,
    current_average_water_rate,
    total_financial_reserves,
    annual_revenue_water_sales,
    annual_revenue_fees_charged,
    annual_revenue_subsidies,
    annual_savings_to_financial_reserves,
    annual_personnel_costs,
    annual_operations_costs,
    annual_debt_costs
  } = req.body;

  const ratesFinances = {
    water_systems_id,
    current_average_water_rate,
    total_financial_reserves,
    annual_revenue_water_sales,
    annual_revenue_fees_charged,
    annual_revenue_subsidies,
    annual_savings_to_financial_reserves,
    annual_personnel_costs,
    annual_operations_costs,
    annual_debt_costs
  };

  if (typeof water_systems_id !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Water systems id must not be blank and must be a number' });
  }
  if (typeof current_average_water_rate !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Current average water rate must not be blank and must be a number' })
  }
  if (typeof total_financial_reserves !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Total financial reserves must not be blank and must be a number' })
  }
  if (typeof annual_revenue_water_sales !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Annual revenue water sales must not be blank and must be a number' });
  }
  if (typeof annual_revenue_fees_charged !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Annual revenue fees charged must not be blank and must be a number' });
  }
  if (typeof annual_revenue_subsidies !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Annual revenue subsidies must not be blank and must be a number' });
  }
  if (typeof annual_savings_to_financial_reserves !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Annual savings to financial reserves must not be blank and must be a number' });
  }
  if (typeof annual_personnel_costs !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Annual personnel costs must not be blank and must be a number' });
  }
  if (typeof annual_operations_costs !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Annual operations costs must not be blank and must be a number' });
  }
  if (typeof annual_debt_costs !== 'number') {
    return res.send({ status: 400, ErrorMessage: 'Annual debt costs must not be blank and must be a number' });
  }

  knex('users')
  .where('id', req.claim.userId)
  .select('water_systems_id')
  .then((result) => {
    if (Number(ratesFinances.water_systems_id) !== result[0].water_systems_id) {
      //TODO: make this a thrown error instead!
      return res.send({ status: 400, ErrorMessage: 'Water system not found!' });
    }
    return knex('rates_finances_fixedcosts')
    .insert(ratesFinances)
  })
  .then((result) => {
    ratesFinances.id = result[0];
    res.status(200).json(ratesFinances);
  })
  .then(() => {
    return knex('users')
    .where('id', req.claim.userId)
    .update({
      profileStepCompleted: 'revenue',
    })
  })
  .catch((err) => {
    res.send({ status: 400, ErrorMessage: err });
  });
}

module.exports = postRatesFinances;
